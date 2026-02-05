import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DISABLE_BACKEND_FETCH, MOCK_PRODUCT_DETAILS, mockDelay } from "@/lib/dev-config";

const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  async (payload: { id: string | number }, { rejectWithValue }) => {
    try {
      // DEV MODE: Return mock data when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log(`🚧 [DEV] Product ${payload.id} details fetch bypassed - using mock data`);
        return MOCK_PRODUCT_DETAILS(Number(payload.id));
      }

      const response = await fetch(`/api/catalog/productdetails?productId=${payload.id}`, {
        method: 'GET',
        credentials: 'include', // Include httpOnly cookies
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch product details');
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    productDetails: null,
    isLoading: false,
    error: null as string | null,
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
      state.error = action.error.message || 'Failed to fetch product details';
      state.isLoading = false;
    });
  },
});

export { getProductDetails };
export const productDetailsReducer = productDetailsSlice.reducer;
