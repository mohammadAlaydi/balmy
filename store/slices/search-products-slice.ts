import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_API_URL;
const getSearchProducts = createAsyncThunk(
  "search-products/getSearchProducts",
  async () => {
    const response = await fetch(`${API_KEY}/v1/categorysearch`);
    const data = await response.json();
    return data;
  }
);
const searchProductsSlice = createSlice({
  name: "searchProducts",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false
    });
    builder.addCase(getSearchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchProducts.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export { getSearchProducts };
export const searchProductsReducer = searchProductsSlice.reducer;
