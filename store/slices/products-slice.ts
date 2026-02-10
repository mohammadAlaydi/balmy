// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { ProductDetailsApiResponse } from '@/types/types';

// export interface Product {
//   id: number;
//   name: string;
//   nameEn: string;
//   price: number;
//   priceEn: string;
//   code: string;
//   images: string[];
//   category: string;
//   inStock: boolean;
//   rating: number;
//   reviews: number;
// }

// interface ProductsState {
//   products: Product[];
//   isLoading: boolean;
//   error: string | null;
//   selectedProduct: Product | null;
// }


// const initialState: ProductsState = {
//   products: [], 
//   isLoading: false,
//   error: null,
//   selectedProduct: null,
// };

// // Async thunk to fetch products from API
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/products', {
//         method: 'GET',
//         credentials: 'include', // Include httpOnly cookies
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data.message || 'Failed to fetch products');
//       }

//       return data as Product[];
//     } catch (error: any) {
//       console.error('Products fetch error:', error);
//       return rejectWithValue(error.message || 'Failed to fetch products');
//     }
//   }
// );

// // Async thunk to fetch a single product
// export const fetchProductById = createAsyncThunk(
//   'products/fetchProductById',
//   async (id: number, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/products/${id}`, {
//         method: 'GET',
//         credentials: 'include', // Include httpOnly cookies
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data.message || 'Failed to fetch product');
//       }

//       return data as Product;
//     } catch (error: any) {
//       console.error('Product fetch error:', error);
//       return rejectWithValue(error.message || 'Failed to fetch product');
//     }
//   }
// );

// // RTK Query API for product details - now uses Next.js API routes
// export const productApi = createApi({
//   reducerPath: 'productApi',
//   baseQuery: fetchBaseQuery({ 
//     baseUrl: '', // Use relative URLs for Next.js API routes
//     prepareHeaders: (headers) => {
//       // No need to set authorization header - handled by httpOnly cookies
//       return headers;
//     },
//   }),
//   tagTypes: ['Product'],
//   endpoints: (builder) => ({
//     getProductDetails: builder.query<ProductDetailsApiResponse, number>({
//       query: (id) => `/api/product-details/${id}`,
//       providesTags: (result, error, id) => [{ type: 'Product', id }],
//     }),
//   }),
// });

// export const { useGetProductDetailsQuery } = productApi;

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
//       state.selectedProduct = action.payload;
//     },
//   },
//             extraReducers: (builder) => {
//             builder
//               // Fetch products
//               .addCase(fetchProducts.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//               })
//               .addCase(fetchProducts.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 // Only update products if we got valid data
//                 if (action.payload && Array.isArray(action.payload) && action.payload.length > 0) {
//                   state.products = action.payload;
//                 }
//                 // Keep fallback data if API returns empty array
//                 state.error = null;
//               })
//               .addCase(fetchProducts.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//                 // Keep existing fallback products on error
//                 console.warn('Products fetch failed, using fallback data:', action.payload);
//               })
//               // Fetch single product
//               .addCase(fetchProductById.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//               })
//               .addCase(fetchProductById.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.selectedProduct = action.payload;
//                 state.error = null;
//               })
//               .addCase(fetchProductById.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload as string;
//               });
//           },
// });

// export const { clearError, setSelectedProduct } = productsSlice.actions;
// export default productsSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DISABLE_BACKEND_FETCH, MOCK_PRODUCTS, MOCK_PRODUCT_DETAILS, mockDelay } from "@/lib/dev-config";

// Types
export interface Product {
  id: number;
  name: string;
  nameEn?: string;
  price: number;
  priceEn?: string;
  code: string;
  images: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface ProductDetailsApiResponse {
  data: Product;
}

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
};

// -------------------- Async Thunks --------------------
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      // DEV MODE: Return mock data when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log("🚧 [DEV] Products fetch bypassed - using mock data");
        return MOCK_PRODUCTS.data as unknown as Product[];
      }

      const res = await fetch("/api/products", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch products");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

export const fetchProductById = createAsyncThunk<Product, number, { rejectValue: string }>(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      // DEV MODE: Return mock data when backend is disabled
      if (DISABLE_BACKEND_FETCH) {
        await mockDelay();
        console.log(`🚧 [DEV] Product ${id} fetch bypassed - using mock data`);
        const mockProduct = MOCK_PRODUCTS.data.find(p => p.id === id) || MOCK_PRODUCTS.data[0];
        return mockProduct as unknown as Product;
      }

      const res = await fetch(`/api/products/${id}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch product");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch product");
    }
  }
);

// -------------------- RTK Query API --------------------
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductDetails: builder.query<ProductDetailsApiResponse, { id: number; locale: string }>({
      queryFn: async ({ id, locale }, _queryApi, _extraOptions, baseQuery) => {
        if (DISABLE_BACKEND_FETCH) {
          await mockDelay();
          console.log(`🚧 [DEV] Product Details ${id} fetch bypassed - using mock data`);
          // Ensure we return the data structure expected by the frontend
          return { data: MOCK_PRODUCT_DETAILS(id) };
        }
        return baseQuery(`/api/catalog/productdetails?productId=${id}&locale=${locale}`) as any;
      },
      providesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
  }),
});

export const { useGetProductDetailsQuery } = productApi;

// -------------------- Slice --------------------
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch products";
      })
      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch product";
      });
  },
});

export const { clearError, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
