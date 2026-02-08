import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DISABLE_BACKEND_FETCH, MOCK_CATEGORY_PRODUCTS, mockDelay } from "@/lib/dev-config";
import { transformProduct } from "@/lib/markatty-transformer";

export const getCategoryProducts = createAsyncThunk(
  "categories/products",
  async ({ id, page = 1 }: { id: string | number; page?: number }, { rejectWithValue }) => {
    try {
      // DEV MODE: Return mock data when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log(`🚧 [DEV] Category ${id} products fetch bypassed - using mock data`);
        return MOCK_CATEGORY_PRODUCTS(id);
      }

      const response = await fetch(`/api/catalog/categoryproducts?categoryId=${id}&page=${page}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch category products");
      }

      // Transform Markatty categoryPageData response to frontend format
      // API returns: { success, productList, categories, ... }
      const transformedProducts = (data.productList || []).map(transformProduct);

      return {
        data: transformedProducts,
        category: {
          name: data.categoryName || "",
          id: id,
        },
        totalCount: data.totalCount || transformedProducts.length,
        _raw: data,
      };
    } catch (error: any) {
      console.error("Error fetching category products:", error);
      return rejectWithValue(error.message || "Failed to fetch category products");
    }
  }
);

const categoryProductsSlice = createSlice({
  name: "categories/products",
  initialState: {
    products: { data: [] as any[], category: null as any },
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
        state.products = action.payload || { data: [], category: null };
      })
      .addCase(getCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.products = { data: [], category: null };
      });
  },
});

export const categoryProductsSliceReducer = categoryProductsSlice.reducer;
