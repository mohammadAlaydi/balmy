import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DISABLE_BACKEND_FETCH, MOCK_CATEGORIES, mockDelay } from "@/lib/dev-config";

const getCategories = createAsyncThunk("categories", async (locale: string, { rejectWithValue }) => {
  try {
    // DEV MODE: Return mock data when backend is disabled
    if (DISABLE_BACKEND_FETCH) {
      await mockDelay();
      console.log("🚧 [DEV] Categories fetch bypassed - using mock data");
      return MOCK_CATEGORIES;
    }

    const response = await fetch(`/api/categories?locale=${locale}`, {
      method: "GET",
      credentials: 'include', // Include httpOnly cookies
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to fetch categories");
    }

    return data;
  } catch (error: any) {
    console.error('Categories fetch error:', error);
    return rejectWithValue(error.message || 'Network error occurred');
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export { getCategories };
export const categoriesSliceReducer = categoriesSlice.reducer;
