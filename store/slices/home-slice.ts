import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DISABLE_BACKEND_FETCH, MOCK_HOME_DATA, mockDelay } from "@/lib/dev-config";

export const getHomeData = createAsyncThunk(
  "home/getHomeData",
  async (locale: string, { rejectWithValue }) => {
    try {
      // DEV MODE: Return mock data when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log("🚧 [DEV] Home data fetch bypassed - using mock data");
        return { ...MOCK_HOME_DATA, locale };
      }

      const response = await fetch(`/api/catalog/homepage?locale=${locale}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch home data");
      }

      // ✅ Attach locale info to the payload
      return { ...data, locale };
    } catch (error: any) {
      console.error("Home data fetch error:", error);
      return rejectWithValue(error.message || "Network error occurred");
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    data: {} as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeData.pending, (state) => {
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

export const homeSliceReducer = homeSlice.reducer;
