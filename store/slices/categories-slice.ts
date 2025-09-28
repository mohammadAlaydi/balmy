import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

const getCategories = createAsyncThunk("categories", async () => {
    try {
        const response = await fetch(`${API_KEY}/v1/categories`, {
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

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: null as string | null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload
                state.loading = false
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export { getCategories };
export const categoriesSliceReducer = categoriesSlice.reducer