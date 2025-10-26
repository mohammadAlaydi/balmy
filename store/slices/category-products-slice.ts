import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getCategoryProducts = createAsyncThunk(
  "categories/products",
  async (payload: { categoryId: string | number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/category-products/${payload?.categoryId}`, {
        method: "GET",
        credentials: 'include', // Include httpOnly cookies
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch category products")
      }

      return data
    } catch (error: any) {
      console.error("Error fetching category products:", error)
      return rejectWithValue(error.message || "Failed to fetch category products")
    }
  }
)
const categoryProductsSlice = createSlice({
  name: "categories/products",
  initialState: {
    products: {
      data: [] as any[],
    },
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategoryProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload || { data: [] }
      })
      .addCase(getCategoryProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.products = { data: [] }
      })
  },
})

export { getCategoryProducts };
export const categoryProductsSliceReducer = categoryProductsSlice.reducer