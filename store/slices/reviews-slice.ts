import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedFetch } from "@/lib/authenticated-fetch"; // Can use regular fetch for public reviews but authenticated for submitting
import { DISABLE_BACKEND_FETCH, mockDelay } from "@/lib/dev-config";

interface ReviewState {
    reviews: any[];
    isLoading: boolean;
    error: string | null;
    submitStatus: string | null;
}

const initialState: ReviewState = {
    reviews: [],
    isLoading: false,
    error: null,
    submitStatus: null,
};

// 📋 Get Reviews
export const getReviews = createAsyncThunk(
    "reviews/get",
    async (payload: { productId: number; page?: number }, { rejectWithValue }) => {
        try {
            const page = payload.page || 1;

            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                return { data: [] };
            }

            // Public endpoint usually, but keeping consistent pattern
            const res = await fetch(`/api/catalog/reviewlist?productId=${payload.productId}&page=${page}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch reviews");
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// ✍️ Submit Review
export const submitReview = createAsyncThunk(
    "reviews/submit",
    async (payload: any, { rejectWithValue }) => {
        try {
            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                return { success: true, message: "Review submitted (mock)" };
            }

            const res = await authenticatedFetch("/api/catalog/savereview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to submit review");
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        resetSubmitStatus: (state) => {
            state.submitStatus = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getReviews.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload.data || [];
        });
        builder.addCase(getReviews.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        builder.addCase(submitReview.pending, (state) => {
            state.isLoading = true;
            state.submitStatus = 'loading';
        });
        builder.addCase(submitReview.fulfilled, (state) => {
            state.isLoading = false;
            state.submitStatus = 'success';
        });
        builder.addCase(submitReview.rejected, (state, action) => {
            state.isLoading = false;
            state.submitStatus = 'failed';
            state.error = action.payload as string;
        });
    },
});

export const { resetSubmitStatus } = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
