
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cart-slice";
import authReducer from './features/auth-slice';
import { searchProductsReducer } from "./slices/search-products-slice";
import { productDetailsReducer } from "./slices/product-details-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    searchProducts: searchProductsReducer,
    productDetails: productDetailsReducer,
  },
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

      