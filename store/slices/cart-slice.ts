import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

// get cart products

const getCartProducts = createAsyncThunk(
  "cart/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/cart", {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch cart");
      }

      return data;
    } catch (error: any) {
      console.error("Cart fetch error:", error);
      return rejectWithValue(error.message || "Failed to fetch cart");
    }
  }
);

// add to cart
const addToCart = createAsyncThunk(
  "cart/add",
  async (
    payload: { productId: number; productQTY?: string | number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: payload.productId,
          quantity: payload?.productQTY ? payload?.productQTY : 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to add to cart");
      }

      // Refetch cart items after successful add
      dispatch(getCartProducts());
      return data;
    } catch (error: any) {
      console.error("Add to cart error:", error);
      return rejectWithValue(error.message || "Failed to add to cart");
    }
  }
);

// remove product from cart
const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (payload: { productId: number }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`/api/cart/remove/${payload.productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to remove from cart");
      }

      // Refetch cart items after successful remove
      dispatch(getCartProducts());
      return data;
    } catch (error: any) {
      console.error("Remove from cart error:", error);
      return rejectWithValue(error.message || "Failed to remove from cart");
    }
  }
);

// remove all products from cart
const removeAllProductsFromCart = createAsyncThunk(
  "cart/remove/all/products",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to clear cart");
      }

      // Refetch cart items after successful clear
      dispatch(getCartProducts());
      return data;
    } catch (error: any) {
      console.error("Clear cart error:", error);
      return rejectWithValue(error.message || "Failed to clear cart");
    }
  }
);
//save cart order
const saveOrder = createAsyncThunk(
  "save-order",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Checkout failed");
      }

      return data;
    } catch (error: any) {
      console.error("Checkout error:", error);
      return rejectWithValue(error.message || "Checkout failed");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null as any,
    saveOrderData: {},
    increaseOrDecreaseLoading: false,
    increaseOrDecreaseResponse: {},
    isLoading: false,
    error: null,
    status: null as string | null, // Only for order completion (success/failed)
    cartStatus: null as string | null, // For cart operations (add/remove)
  },
  reducers: {
    resetStatus: (state) => {
      console.log(
        "🔄 resetStatus called, changing status from",
        state.status,
        "to null"
      );
      // If we just completed an order, clear the saved order and cart data now
      if (state.status === "success") {
        state.saveOrderData = {};
        state.data = null as any;
      }
      state.status = null;
    },
    // Optimistically update quantity locally without a network request
    applyLocalQuantityDelta: (
      state,
      action: {
        payload: { productId: number; delta: number };
      }
    ) => {
      const { productId, delta } = action.payload;

      const mutateItems = (items: any[] | undefined | null) => {
        if (!Array.isArray(items)) return { affected: false, unitDeltaTotal: 0 };
        let affected = false;
        let unitDeltaTotal = 0;
        for (const item of items) {
          const idMatch =
            item?.additional?.product_id === productId ||
            item?.product?.id === productId;
          if (!idMatch) continue;
          const prevQtyNum = Number(item?.quantity ?? 0) || 0;
          const priceRaw = item?.product?.price;
          const unitPrice =
            typeof priceRaw === "number"
              ? priceRaw
              : Number(
                  priceRaw?.value ??
                    priceRaw?.final_price ??
                    priceRaw?.base_price ??
                    0
                );
          const nextQty = Math.max(1, prevQtyNum + delta);
          const actualAppliedDelta = nextQty - prevQtyNum;
          if (actualAppliedDelta !== 0) {
            item.quantity = nextQty;
            unitDeltaTotal += unitPrice * actualAppliedDelta;
            affected = true;
          }
          break;
        }
        return { affected, unitDeltaTotal };
      };

      // Update both possible sources (server payload mirrors)
      const itemsA = state?.data?.data?.items;
      const { affected: affectedA, unitDeltaTotal: deltaTotalA } = mutateItems(
        itemsA
      );

      const itemsB = (state as any)?.increaseOrDecreaseResponse?.data?.items;
      const { affected: affectedB, unitDeltaTotal: deltaTotalB } = mutateItems(
        itemsB
      );

      // Adjust summary numbers if we have cart totals in state
      const cartData = (state as any)?.data?.data;
      const totalDelta = (deltaTotalA || 0) || (deltaTotalB || 0);
      if ((affectedA || affectedB) && cartData) {
        const prevSub = Number(cartData.sub_total ?? 0) || 0;
        const nextSub = prevSub + totalDelta;
        cartData.sub_total = Number(nextSub.toFixed(2));
        const prevTax = Number(cartData.base_tax_total ?? 0) || 0;
        // Leave tax unchanged if we don't know rate; recompute grand as sub + tax
        cartData.grand_total = Number((nextSub + prevTax).toFixed(2));
      }
    },
  },
  extraReducers(builder) {
    // Get cart products
    builder.addCase(getCartProducts?.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartProducts?.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCartProducts.rejected, (state: any, action) => {
      state.error = action.error.message || null;
      state.isLoading = false;
    });

    // Add to cart
    builder.addCase(addToCart.pending, (state) => {
      state.increaseOrDecreaseLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.increaseOrDecreaseLoading = false;
      state.increaseOrDecreaseResponse = action.payload;
      state.cartStatus = "success"; // Use cartStatus instead of status
      try {
        const message = (action.payload as any)?.message || "Added to cart";
        toast.success(message);
      } catch (e) {
        // Fallback toast if payload shape unexpected
        toast.success("Added to cart");
      }
    });
    builder.addCase(addToCart.rejected, (state: any, action) => {
      state.error = action.error.message || null;
      state.increaseOrDecreaseLoading = false;
      // Only show toast for non-authentication errors
      if (
        action.error?.message &&
        !action.error.message.includes("Unauthorized") &&
        !action.error.message.includes("authentication")
      ) {
        toast.error(action.error.message);
      } else if (
        !action.error?.message ||
        (!action.error.message.includes("Unauthorized") &&
          !action.error.message.includes("authentication"))
      ) {
        toast.error("Failed to add to cart");
      }
    });

    // Remove from cart
    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartStatus = "success";
    });
    builder.addCase(removeFromCart.rejected, (state: any, action) => {
      state.error = action.error.message || null;
      state.isLoading = false;
      state.status = "failed";
    });

    // Remove all products from cart
    builder.addCase(removeAllProductsFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeAllProductsFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = "success";
    });
    builder.addCase(
      removeAllProductsFromCart.rejected,
      (state: any, action) => {
        state.error = action.error.message || null;
        state.isLoading = false;
        state.status = "failed";
      }
    );

    // save order
    builder.addCase(saveOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveOrder.fulfilled, (state, action) => {
      state.saveOrderData = action.payload;
      state.isLoading = false;
      state.status = "success";
    });
    builder.addCase(saveOrder.rejected, (state: any, action) => {
      state.error = action.error.message || null;
      state.isLoading = false;
      state.status = "failed";
    });
  },
});

export const { resetStatus, applyLocalQuantityDelta } = cartSlice.actions;
export {
  getCartProducts,
  addToCart,
  removeFromCart,
  removeAllProductsFromCart,
  saveOrder,
};
export const cartReducer = cartSlice.reducer;
