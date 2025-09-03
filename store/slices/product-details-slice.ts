import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  async (payload: { id: string | number }) => {
    const response = await fetch(`${API_KEY}/v1/product-details/${payload.id}`);
    const data = await response.json();
    return data;
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    productDetails: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.productDetails = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export { getProductDetails };
export const productDetailsReducer = productDetailsSlice.reducer;
