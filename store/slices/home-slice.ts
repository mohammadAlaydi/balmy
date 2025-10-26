import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getHomeData = createAsyncThunk("home", async (locale: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/home?locale=${locale}`, {
      method: "GET",
      credentials: 'include', // Include httpOnly cookies
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to fetch home data");
    }

    return data;
  } catch (error: any) {
    console.error('Home data fetch error:', error);
    return rejectWithValue(error.message || 'Network error occurred');
  }
});
const homeSlice = createSlice({
  name: "home",
  initialState: {
    data: {} as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export { getHomeData };
export const homeSliceReducer = homeSlice.reducer;
