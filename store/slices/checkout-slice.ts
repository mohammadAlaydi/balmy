import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedFetch } from "@/lib/authenticated-fetch";
import { DISABLE_BACKEND_FETCH, mockDelay } from "@/lib/dev-config";

interface CheckoutState {
    shippingMethods: any[];
    paymentMethods: any[];
    isLoading: boolean;
    error: string | null;
    shippingAddress: any | null;
}

const initialState: CheckoutState = {
    shippingMethods: [],
    paymentMethods: [],
    isLoading: false,
    error: null,
    shippingAddress: null,
};

// 🚚 Get Shipping Methods
export const getShippingMethods = createAsyncThunk(
    "checkout/getShippingMethods",
    async (_, { rejectWithValue }) => {
        try {
            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                return { data: [{ code: 'flatrate', title: 'Flat Rate', price: 50 }] }; // Mock
            }

            const res = await authenticatedFetch("/api/checkout/shippingmethods");
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch shipping methods");
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// 💳 Get Payment Methods
export const getPaymentMethods = createAsyncThunk(
    "checkout/getPaymentMethods",
    async (_, { rejectWithValue }) => {
        try {
            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                return { data: [{ code: 'cashondelivery', title: 'Cash on Delivery' }] }; // Mock
            }

            const res = await authenticatedFetch("/api/checkout/paymentinfo");
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch payment methods");
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// 🏠 Save Address
export const saveAddress = createAsyncThunk(
    "checkout/saveAddress",
    async (payload: any, { rejectWithValue }) => {
        try {
            if (DISABLE_BACKEND_FETCH) {
                await mockDelay();
                return { success: true, message: "Address saved (mock)" };
            }

            const res = await authenticatedFetch("/api/checkout/saveaddress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to save address");
            return data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Shipping Methods
        builder.addCase(getShippingMethods.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getShippingMethods.fulfilled, (state, action) => {
            state.isLoading = false;
            state.shippingMethods = action.payload.data || [];
        });
        builder.addCase(getShippingMethods.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Payment Methods
        builder.addCase(getPaymentMethods.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getPaymentMethods.fulfilled, (state, action) => {
            state.isLoading = false;
            state.paymentMethods = action.payload.data || [];
        });
        builder.addCase(getPaymentMethods.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        // Save Address
        builder.addCase(saveAddress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(saveAddress.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(saveAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});

export const checkoutReducer = checkoutSlice.reducer;
