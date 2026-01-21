import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DISABLE_BACKEND_FETCH, MOCK_CATEGORY_PRODUCTS, mockDelay } from "@/lib/dev-config";

export const getCategoryProducts = createAsyncThunk(
  "categories/products",
  async ({ id }: { id: string | number }, { rejectWithValue }) => {
    try {
      // DEV MODE: Return mock data when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log(`🚧 [DEV] Category ${id} products fetch bypassed - using mock data`);
        return MOCK_CATEGORY_PRODUCTS(id);
      }

      const response = await fetch(`/api/category-products/${id}`, {
        method: "GET",
        credentials: "include", // Include httpOnly cookies
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch category products");
      }

      return data;
    } catch (error: any) {
      console.error("Error fetching category products:", error);
      return rejectWithValue(error.message || "Failed to fetch category products");
    }
  }
);

const categoryProductsSlice = createSlice({
  name: "categories/products",
  initialState: {
    products: { data: [] as any[] },
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || { data: [] };
      })
      .addCase(getCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.products = { data: [] };
      });
  },
});

export const categoryProductsSliceReducer = categoryProductsSlice.reducer;
