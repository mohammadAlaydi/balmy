import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

const getHomeData = createAsyncThunk("home", async () => {
  try {
    const response = await fetch(`${API_KEY}/v1/home`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("accessToken")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch category products");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
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
export { getHomeData };
export const homeSliceReducer = homeSlice.reducer;
