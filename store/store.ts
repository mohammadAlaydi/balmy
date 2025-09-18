import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cart-slice";
import authReducer from "./slices/auth-slice";
import { searchProductsReducer } from "./slices/search-products-slice";
import { productDetailsReducer } from "./slices/product-details-slice";
import { categoryProductsSliceReducer } from "./slices/category-products-slice";
import { categoriesSliceReducer } from "./slices/categories-slice";
import { homeSliceReducer } from "./slices/home-slice";
import { productApi } from "./slices/products-slice";
import favouritesReducer from "./slices/favourite-slice";

export const store = configureStore({
  reducer: {
    home: homeSliceReducer,
    auth: authReducer,
    cart: cartReducer,
    searchProducts: searchProductsReducer,
    productDetails: productDetailsReducer,
    categories: categoriesSliceReducer,
    categoryProducts: categoryProductsSliceReducer,
    favourites: favouritesReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
