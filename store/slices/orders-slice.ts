import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedFetch } from "@/lib/authenticated-fetch";
import { DISABLE_BACKEND_FETCH, mockDelay } from "@/lib/dev-config";

interface OrdersState {
    orders: any[];
    currentOrder: any | null;
    isLoading: boolean;
    error: string | null;
    reorderStatus: string | null;
}

const initialState: OrdersState = {
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null,
    reorderStatus: null,
};

// 📋 Get Order List
export const getOrderList = createAsyncThunk(
    "orders/getList",
    async (payload: { page?: number; limit?: number } | void, { rejectWithValue }) => {
        try {
            const page = payload?.page || 1;
            const limit = payload?.limit || 20;

            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                return { data: [] }; // Mock empty list for now
            }

            const res = await authenticatedFetch(`/api/customer/orderlist?page=${page}&limit=${limit}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// 📦 Get Order Details
export const getOrderDetails = createAsyncThunk(
    "orders/getDetails",
    async (orderId: string | number, { rejectWithValue }) => {
        try {
            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                return { data: { id: orderId } };
            }

            const res = await authenticatedFetch(`/api/customer/orderdetails?orderId=${orderId}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch order details");
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// 🔄 Reorder
export const reorder = createAsyncThunk(
    "orders/reorder",
    async (orderId: string | number, { rejectWithValue }) => {
        try {
            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                return { success: true, message: "Reorder successful (mock)" };
            }

            const res = await authenticatedFetch("/api/customer/reorder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to reorder");
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        },
        resetReorderStatus: (state) => {
            state.reorderStatus = null;
        }
    },
    extraReducers: (builder) => {
        // List
        builder.addCase(getOrderList.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getOrderList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.data || [];
        });
        builder.addCase(getOrderList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Details
        builder.addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentOrder = action.payload.data;
        });
        builder.addCase(getOrderDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Reorder
        builder.addCase(reorder.pending, (state) => {
            state.isLoading = true;
            state.reorderStatus = 'loading';
        });
        builder.addCase(reorder.fulfilled, (state) => {
            state.isLoading = false;
            state.reorderStatus = 'success';
        });
        builder.addCase(reorder.rejected, (state, action) => {
            state.isLoading = false;
            state.reorderStatus = 'failed';
            state.error = action.payload as string;
        });
    },
});

export const { clearCurrentOrder, resetReorderStatus } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
