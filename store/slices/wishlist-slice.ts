import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedFetch } from "@/lib/authenticated-fetch";
import { DISABLE_BACKEND_FETCH, mockDelay, MOCK_PRODUCTS } from "@/lib/dev-config";

interface WishlistState {
    items: any[];
    isLoading: boolean;
    error: string | null;
    status: string | null;
}

const initialState: WishlistState = {
    items: [],
    isLoading: false,
    error: null,
    status: null,
};

// 📋 Get Wishlist
export const getWishlist = createAsyncThunk(
    "wishlist/get",
    async (_, { rejectWithValue }) => {
        try {
            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                // Return random items from mock products
                return { data: MOCK_PRODUCTS.data.slice(0, 4) };
            }
            const res = await authenticatedFetch("/api/customer/wishlist");
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch wishlist");
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// ➕ Add to Wishlist
export const addToWishlist = createAsyncThunk(
    "wishlist/add",
    async (productId: number, { rejectWithValue, dispatch }) => {
        try {
            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                dispatch(getWishlist());
                return { success: true, message: "Added to wishlist (mock)" };
            }
            const res = await authenticatedFetch("/api/customer/wishlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to add to wishlist");
            dispatch(getWishlist());
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// ➖ Remove from Wishlist
export const removeFromWishlist = createAsyncThunk(
    "wishlist/remove",
    async (productId: number, { rejectWithValue, dispatch }) => {
        try {
            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                dispatch(getWishlist());
                return { success: true, message: "Removed from wishlist (mock)" };
            }
            const res = await authenticatedFetch("/api/customer/wishlist", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to remove from wishlist");
            dispatch(getWishlist());
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data || [];
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const wishlistReducer = wishlistSlice.reducer;
