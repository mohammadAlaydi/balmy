import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedFetch } from "@/lib/authenticated-fetch";
import { login, register, logout } from "./auth-slice";
import { DISABLE_BACKEND_FETCH, MOCK_CART, mockDelay, MOCK_PRODUCTS } from "@/lib/dev-config";

/* -------------------------------------------------------------------------- */
/*                               Async Thunks                                 */
/* -------------------------------------------------------------------------- */

// Helper functions for local storage persistence (Mock DB)
const saveStoredCart = (cartData: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mock_cart", JSON.stringify(cartData));
  }
};

const getStoredCart = (): any => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const stored = localStorage.getItem("mock_cart");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
};

// Create a local mutable copy of the mock cart to avoid "object is not extensible" errors
// and persist across reloads
let localMockCart = getStoredCart() || JSON.parse(JSON.stringify(MOCK_CART));

// Helper to update totals and save
const updateCartTotalsAndSave = () => {
  let count = 0;
  let qty = 0;
  let total = 0;

  if (localMockCart?.data?.items) {
    localMockCart.data.items.forEach((item: any) => {
      count += 1;
      qty += item.quantity;
      total += item.total || (item.quantity * (item.product.price || 0));
    });

    localMockCart.data.items_count = count;
    localMockCart.data.items_qty = qty;
    localMockCart.data.grand_total = total;
    localMockCart.data.sub_total = total;
    localMockCart.data.base_tax_total = total * 0.15; // Mock tax
  }

  saveStoredCart(localMockCart);
};

// 🛒 Get cart products
export const getCartProducts = createAsyncThunk(
  "cart/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      // DEV MODE: Return mock data when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log("🚧 [DEV] Cart fetch bypassed - using local storage data");

        // Refresh local variable from storage in case it changed in another tab
        const stored = getStoredCart();
        if (stored) {
          localMockCart = stored;
        }

        // Return a DEEP COPY to prevent Redux from freezing our mutable localMockCart
        return JSON.parse(JSON.stringify(localMockCart));
      }

      const res = await authenticatedFetch("/api/checkout/cartdetails");
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
      // DEV MODE: Return mock data when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log(`🚧 [DEV] Order ${orderId} fetch bypassed - using mock data`);
        return { data: { id: orderId, items: [], total: 0 } };
      }

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
      // DEV MODE: Return mock success when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log(`🚧 [DEV] Add to cart bypassed - product ${payload.productId}`);

        // Mock Implementation
        // @ts-ignore - MOCK_PRODUCTS is typed loosely
        const product = MOCK_PRODUCTS.data.find((p: any) => p.id === payload.productId || p.product_id === payload.productId);

        if (product) {
          // @ts-ignore
          const existingItem = localMockCart.data.items.find((i: any) => i.product.id === product.id);
          if (existingItem) {
            existingItem.quantity += (payload.productQTY || 1);
            existingItem.total = existingItem.quantity * existingItem.product.price;
          } else {
            // @ts-ignore
            localMockCart.data.items.push({
              id: Math.random(),
              quantity: payload.productQTY || 1,
              product: product,
              total: (payload.productQTY || 1) * product.price
            });
          }

          // Recalculate totals and save
          updateCartTotalsAndSave();
        }

        dispatch(getCartProducts());
        return { success: true, message: "Added to cart (mock)" };
      }

      const res = await authenticatedFetch("/api/checkout/addtocart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: payload.productId,
          qty: payload.productQTY ?? 1,
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
      // DEV MODE: Return mock success when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log(`🚧 [DEV] Remove from cart bypassed - product ${payload.productId}`);

        // @ts-ignore
        localMockCart.data.items = localMockCart.data.items.filter((item: any) => item.id !== payload.productId && item.product.id !== payload.productId);

        // Recalculate totals and save
        updateCartTotalsAndSave();

        dispatch(getCartProducts());
        return { success: true, message: "Removed from cart (mock)" };
      }

      const res = await authenticatedFetch("/api/checkout/removefromcart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: payload.productId }),
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
      // DEV MODE: Return mock success when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log("🚧 [DEV] Clear cart bypassed");

        // @ts-ignore
        localMockCart.data.items = [];

        // Recalculate totals and save
        updateCartTotalsAndSave();

        dispatch(getCartProducts());
        return { success: true, message: "Cart cleared (mock)" };
      }

      const res = await authenticatedFetch("/api/checkout/emptycart", { method: "POST" });
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
      // DEV MODE: Return mock success when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log(`🚧 [DEV] Update quantity bypassed - product ${payload.productId}`);
        return { success: true, message: "Quantity updated (mock)" };
      }

      const res = await authenticatedFetch("/api/checkout/updatecart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: payload.productId, qty: payload.quantity }),
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
      // DEV MODE: Return mock success when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log("🚧 [DEV] Save order bypassed");
        return { success: true, order_id: "MOCK-ORDER-123", message: "Order saved (mock)" };
      }

      const res = await fetch("/api/checkout/placeorder", {
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
    saveOrderData: {} as any,
    increaseOrDecreaseLoading: false,
    increaseOrDecreaseResponse: {} as any,
    isLoading: false,
    error: null as string | null,
    status: null as string | null,
    cartStatus: null as string | null,
    orderDetails: null as any,
    isCartOpen: false,
  },
  reducers: {
    setCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
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
    // Clear cart when user logs in/registers/logs out to prevent showing stale data
    // عند الـ login / register: السلة هتتجلب من الـ API بنفس الحساب
    // عند الـ logout: نمسح السلة من الـ Redux بس، لكن الداتا بتفضل محفوظة في السيرفر
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
      })
      .addCase(logout.fulfilled, (state) => {
        // Clear cart locally on logout
        state.data = null;
        state.increaseOrDecreaseResponse = {};
        state.status = null;
        state.cartStatus = null;
        state.error = null;
        state.isLoading = false;
      });
  },
});

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */

export const { applyLocalQuantityDelta, resetStatus, clearCart, setCartOpen } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
