import { useThunk } from "@/app/helpers/thunk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const getCartProducts = useThunk("cart/products", `${API_KEY}/cart`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage?.getItem("token")}`,
  },
});
console.log(API_KEY, "API_KEY ❓❓❓❓");

// add to cart
const addToCart = createAsyncThunk(
  "cart/add",
  async (payload: { productId: number }) => {
    try {
      const response = await fetch(
        `${API_KEY}/v1/customer/cart/add/${payload.productId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
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
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
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
      state.isLoading = false;
    });
    builder.addCase(addToCart.rejected, (state: any, action) => {
      state.error = action.error.message || null;
      state.isLoading = false;
    });
  },
});

export { getCartProducts, addToCart };
export const cartReducer = cartSlice.reducer;
