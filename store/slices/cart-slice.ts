import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedFetch } from "@/lib/authenticated-fetch";
import { DISABLE_BACKEND_FETCH, mockDelay } from "@/lib/dev-config";

interface CartState {
  data: any | null;
  isLoading: boolean;
  error: string | null;
  status: string | null;
  saveOrderData: any | null;
  orderDetails: any | null;
  isCartOpen: boolean;
}

const initialState: CartState = {
  data: null,
  isLoading: false,
  error: null,
  status: null,
  saveOrderData: null,
  orderDetails: null,
  isCartOpen: false,
};

// 🛒 Get Cart Products
export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (_, { rejectWithValue }) => {
    try {
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        return { data: { items: [] } };
      }

      const res = await authenticatedFetch("/api/checkout/cartdetails");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ➕ Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, productQTY = 1 }: { productId: number; productQTY?: number },
    { rejectWithValue }
  ) => {
    try {
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        return { success: true, message: "Added to cart (mock)" };
      }

      const res = await authenticatedFetch("/api/checkout/addtocart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, qty: productQTY }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ❌ Remove from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }: { productId: number }, { rejectWithValue, dispatch }) => {
    try {
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        return { success: true, message: "Removed from cart (mock)" };
      }

      const res = await authenticatedFetch("/api/checkout/removefromcart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to remove from cart");
      // Re-fetch cart after removal
      dispatch(getCartProducts());
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🗑️ Remove All Products from Cart
export const removeAllProductsFromCart = createAsyncThunk(
  "cart/removeAllProductsFromCart",
  async (_, { rejectWithValue }) => {
    try {
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        return { success: true, message: "Cart cleared (mock)" };
      }

      const res = await authenticatedFetch("/api/checkout/emptycart", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to clear cart");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 📦 Save Order
export const saveOrder = createAsyncThunk(
  "cart/saveOrder",
  async (payload: any, { rejectWithValue }) => {
    try {
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        return { success: true, data: { data: { order: { id: 1 }, success: true } } };
      }

      const res = await authenticatedFetch("/api/checkout/placeorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save order");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// 🧾 Get Order by ID
export const getOrderById = createAsyncThunk(
  "cart/getOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        return { data: { id: orderId, status: "completed" } };
      }

      const res = await authenticatedFetch(`/api/customer/orderdetails?orderId=${orderId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch order");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    resetStatus: (state) => {
      state.status = null;
      state.saveOrderData = null;
    },
  },
  extraReducers: (builder) => {
    // Get Cart Products
    builder.addCase(getCartProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCartProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getCartProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Add to Cart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Remove from Cart
    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeFromCart.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Remove All Products from Cart
    builder.addCase(removeAllProductsFromCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeAllProductsFromCart.fulfilled, (state) => {
      state.isLoading = false;
      state.data = null;
    });
    builder.addCase(removeAllProductsFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Save Order
    builder.addCase(saveOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(saveOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.saveOrderData = action.payload;
      state.status = "success";
    });
    builder.addCase(saveOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.status = "failed";
    });

    // Get Order by ID
    builder.addCase(getOrderById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderDetails = action.payload;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setCartOpen, resetStatus } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
