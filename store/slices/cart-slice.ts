import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

// get cart products

const getCartProducts = createAsyncThunk("cart/products", async () => {
  const response = await fetch(`${API_KEY}/v1/customer/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage?.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
});

// add to cart
const addToCart = createAsyncThunk(
  "cart/add",
  async (payload: { productId: number; productQTY?: string | number }) => {
    try {
      const response = await fetch(
        `${API_KEY}/v1/customer/cart/add/${payload.productId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
          body: JSON.stringify({
            quantity: payload?.productQTY ? payload?.productQTY : 1,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  }
);

// remove product from cart
const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (payload: { productId: number }) => {
    const response = await fetch(
      `${API_KEY}/v1/customer/cart/remove/${payload.productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token")}`,
        },
      }
    );
  }
);

//save cart order
const saveOrder = createAsyncThunk("save-order", async (payload: any) => {
  const response = await fetch(
    `${API_KEY}/v1/customer/checkout/save-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
})
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    increaseOrDecreaseQTYResponse: {},
    saveOrderData: {},
    isLoading: false,
    error: null,
    status: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = null;
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
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.increaseOrDecreaseQTYResponse = action.payload
      state.isLoading = false;
    });
    builder.addCase(addToCart.rejected, (state: any, action) => {
      state.error = action.error.message || null;
      state.isLoading = false;
    });

    // Remove from cart
    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true;
      state.status = "success";

    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(removeFromCart.rejected, (state: any, action) => {
      state.error = action.error.message || null;
      state.isLoading = false;
      state.status = "failed"
    });

    // save order
    builder.addCase(saveOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveOrder.fulfilled, (state, action) => {
      state.saveOrderData = action.payload
      state.isLoading = false;
      state.status = "success";

    });
    builder.addCase(saveOrder.rejected, (state: any, action) => {
      state.error = action.error.message || null;
      state.isLoading = false;
      state.status = "failed"

    });
  },
});

export const { resetStatus } = cartSlice.actions;
export { getCartProducts, addToCart, removeFromCart, saveOrder };
export const cartReducer = cartSlice.reducer;
