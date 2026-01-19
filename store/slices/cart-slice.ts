import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedFetch } from "@/lib/authenticated-fetch";
import { login, register } from "./auth-slice";

/* -------------------------------------------------------------------------- */
/*                               Async Thunks                                 */
/* -------------------------------------------------------------------------- */

// 🛒 Get cart products
export const getCartProducts = createAsyncThunk(
  "cart/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authenticatedFetch("/api/cart");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
      return data;
    } catch (err: any) {
      console.error("Cart fetch error:", err);
      return rejectWithValue(err.message);
    }
  }
);

// 🧾 Get specific order by ID
export const getOrderById = createAsyncThunk(
  "cart/getOrderById",
  async (orderId: string | number, { rejectWithValue }) => {
    try {
      const res = await authenticatedFetch(`/api/cart/order/${orderId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch order");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ➕ Add product to cart
export const addToCart = createAsyncThunk(
  "cart/add",
  async (
    payload: { productId: number; productQTY?: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await authenticatedFetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: payload.productId,
          quantity: payload.productQTY ?? 1,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

      dispatch(getCartProducts());
      return data;
    } catch (err: any) {
      console.error("Add to cart error:", err);
      return rejectWithValue(err.message);
    }
  }
);

// ➖ Remove product from cart
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (payload: { productId: number }, { rejectWithValue, dispatch }) => {
    try {
      const res = await authenticatedFetch(`/api/cart/remove/${payload.productId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to remove product");

      dispatch(getCartProducts());
      return data;
    } catch (err: any) {
      console.error("Remove from cart error:", err);
      return rejectWithValue(err.message);
    }
  }
);

// 🧹 Remove all products from cart
export const removeAllProductsFromCart = createAsyncThunk(
  "cart/removeAll",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await authenticatedFetch("/api/cart", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to clear cart");

      dispatch(getCartProducts());
      return data;
    } catch (err: any) {
      console.error("Clear cart error:", err);
      return rejectWithValue(err.message);
    }
  }
);

// 🔄 Update cart quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (
    payload: { productId: number; quantity: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await authenticatedFetch(`/api/cart/update/${payload.productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: payload.quantity }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update quantity");

      dispatch(getCartProducts());
      return data;
    } catch (err: any) {
      console.error("Update quantity error:", err);
      return rejectWithValue(err.message);
    }
  }
);

// 💾 Save order
export const saveOrder = createAsyncThunk(
  "cart/saveOrder",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/checkout/save-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Checkout failed");

      return data;
    } catch (err: any) {
      console.error("Checkout error:", err);
      return rejectWithValue(err.message);
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                                   Slice                                   */
/* -------------------------------------------------------------------------- */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null as any,
    saveOrderData: {},
    increaseOrDecreaseLoading: false,
    increaseOrDecreaseResponse: {},
    isLoading: false,
    error: null as string | null,
    status: null as string | null,
    cartStatus: null as string | null,
    orderDetails: null as any,
  },
  reducers: {
    /** Apply immediate UI update for quantity changes before backend sync */
    applyLocalQuantityDelta: (state, action) => {
      const { productId, delta } = action.payload;
      const items = state.increaseOrDecreaseResponse?.data?.items || [];

      const item = items.find(
        (i: any) => i?.additional?.product_id === productId
      );
      if (item) item.quantity = Math.max(1, item.quantity + delta);
    },

    /** Reset all cart and order statuses */
    resetStatus: (state) => {
      state.status = null;
      state.cartStatus = null;
      state.error = null;
      if (state.saveOrderData) {
        state.saveOrderData.success = null;
      }
    },

    /** Clear cart data - used when user logs in/registers to prevent showing old cart */
    clearCart: (state) => {
      state.data = null;
      state.increaseOrDecreaseResponse = {};
      state.status = null;
      state.cartStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* ------------------------------ getCartProducts ------------------------------ */
    builder
      .addCase(getCartProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    /* --------------------------------- addToCart -------------------------------- */
    builder
      .addCase(addToCart.pending, (state) => {
        state.increaseOrDecreaseLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.increaseOrDecreaseLoading = false;
        state.increaseOrDecreaseResponse = action.payload;
        state.cartStatus = "success";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload as string;
        state.increaseOrDecreaseLoading = false;
      });

    /* ------------------------------- removeFromCart ------------------------------ */
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.isLoading = false;
        state.cartStatus = "success";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
        state.status = "failed";
      });

    /* -------------------------- removeAllProductsFromCart ------------------------ */
    builder
      .addCase(removeAllProductsFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAllProductsFromCart.fulfilled, (state) => {
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(removeAllProductsFromCart.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
        state.status = "failed";
      });

    /* ----------------------------- updateCartQuantity ---------------------------- */
    builder
      .addCase(updateCartQuantity.pending, (state) => {
        state.increaseOrDecreaseLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.increaseOrDecreaseLoading = false;
        state.increaseOrDecreaseResponse = action.payload;
        state.cartStatus = "success";
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload as string;
        state.increaseOrDecreaseLoading = false;
      });

    /* ---------------------------------- saveOrder -------------------------------- */
    builder
      .addCase(saveOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveOrder.fulfilled, (state, action) => {
        state.saveOrderData = action.payload;
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
        state.status = "failed";
      });

    /* -------------------------------- getOrderById ------------------------------- */
    builder
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        state.isLoading = false;
        state.status = "success";
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
        state.status = "failed";
      });

    /* ---------------------------- Clear cart on auth ---------------------------- */
    // Clear cart when user logs in or registers to prevent showing old cart data
    // The cart will be fetched automatically by useCart hook after clearing
    builder
      .addCase(login.fulfilled, (state, action) => {
        // Clear old cart data to prevent showing products from previous session
        state.data = null;
        state.increaseOrDecreaseResponse = {};
        state.status = null;
        state.cartStatus = null;
        state.error = null;
        // Reset loading state so useCart hook can fetch the new cart
        state.isLoading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        // Clear old cart data to prevent showing products from previous session
        state.data = null;
        state.increaseOrDecreaseResponse = {};
        state.status = null;
        state.cartStatus = null;
        state.error = null;
        // Reset loading state so useCart hook can fetch the new cart
        state.isLoading = false;
      });
  },
});

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export const { applyLocalQuantityDelta, resetStatus, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
