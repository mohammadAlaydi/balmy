import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

const getCategoryProducts = createAsyncThunk(
  "categories/products",
  async (payload: { categoryId: string | number }) => {
    try {
      const response = await fetch(`${API_KEY}/v1/category-products/${payload?.categoryId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch category products")
      }

      const data = await response.json()
      return data
    } catch (error: any) {
      console.log(error)
    }
  }
)
const categoryProductsSlice = createSlice({
  name: "categories/products",
  initialState: {
    products: [] as any[],
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
        state.products = action.payload
      })
      .addCase(getCategoryProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export { getCategoryProducts };
export const categoryProductsSliceReducer = categoryProductsSlice.reducer