import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DISABLE_BACKEND_FETCH, MOCK_PRODUCTS, mockDelay } from "@/lib/dev-config";

const getSearchProducts = createAsyncThunk(
  "search-products/getSearchProducts",
  async (params: { query?: string; category?: string; locale?: string } = {}, { rejectWithValue }) => {
    try {
      // DEV MODE: Return mock data when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log("🚧 [DEV] Search products fetch bypassed - using mock data");
        return MOCK_PRODUCTS;
      }

      const searchParams = new URLSearchParams();
      if (params.locale) searchParams.append('locale', params.locale);
      if (params.query) searchParams.append('q', params.query);
      if (params.category) searchParams.append('category', params.category);

      const response = await fetch(`/api/search?${searchParams.toString()}`, {
        method: 'GET',
        credentials: 'include', // Include httpOnly cookies
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to search products');
      }
      
      return data;
    } catch (error: any) {
      console.error('Search products error:', error);
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);
const searchProductsSlice = createSlice({
  name: "searchProducts",
  initialState: {
    products: [],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSearchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchProducts.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to fetch search products';
      state.isLoading = false;
    });
  },
});

export { getSearchProducts };
export const searchProductsReducer = searchProductsSlice.reducer;
