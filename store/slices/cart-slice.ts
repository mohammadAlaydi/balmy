import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.API_BASE_URL;
const TOKEN = localStorage.getItem("token");

const getCartProducts = createAsyncThunk("cart", async () => {
  const response = await fetch(`${API_KEY}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.json();
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCartProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCartProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCartProducts.rejected, (state: any, action) => {
      state.error = action.error.message || null;
      state.isLoading = false;
    });
  },
});

export { getCartProducts };
export const cartReducer = cartSlice.reducer;
