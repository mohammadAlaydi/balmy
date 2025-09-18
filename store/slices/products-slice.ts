import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiService } from '@/lib/api-service';
import { ProductDetailsApiResponse } from '@/types/types';

export interface Product {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  priceEn: string;
  code: string;
  images: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}

// Fallback products data for when API is not available
const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "نعال عربي كلاسيك",
    nameEn: "Classic Arabic Slippers",
    price: 150,
    priceEn: "150 SAR",
    code: "SLP001",
    images: ["/assets/images/product-card.jpg"],
    category: "نعال",
    inStock: true,
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "شماغ قطني أصلي",
    nameEn: "Original Cotton Shemagh",
    price: 200,
    priceEn: "200 SAR",
    code: "SHM001",
    images: ["/assets/images/product-card.jpg"],
    category: "شماغ",
    inStock: true,
    rating: 4.8,
    reviews: 85,
  },
  {
    id: 3,
    name: "حذاء جلد طبيعي",
    nameEn: "Natural Leather Shoes",
    price: 350,
    priceEn: "350 SAR",
    code: "SHO001",
    images: ["/assets/images/product-card.jpg"],
    category: "أحذية",
    inStock: true,
    rating: 4.6,
    reviews: 95,
  },
];

const initialState: ProductsState = {
  products: fallbackProducts, // Start with fallback data
  isLoading: false,
  error: null,
  selectedProduct: null,
};

// Async thunk to fetch products from API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getProducts();
      return response as Product[];
    } catch (error: any) {
      console.error('Products fetch error:', error);
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

// Async thunk to fetch a single product
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await apiService.getProductById(id);
      return response as Product;
    } catch (error: any) {
      console.error('Product fetch error:', error);
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://envaglo-erp.envaglo.net';

// RTK Query API for product details
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProductDetails: builder.query<ProductDetailsApiResponse, number>({
      query: (id) => `/v1/product-details/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetProductDetailsQuery } = productApi;

const productsSlice = createSlice({
  name: 'products',
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
              // Fetch products
              .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                // Only update products if we got valid data
                if (action.payload && Array.isArray(action.payload) && action.payload.length > 0) {
                  state.products = action.payload;
                }
                // Keep fallback data if API returns empty array
                state.error = null;
              })
              .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                // Keep existing fallback products on error
                console.warn('Products fetch failed, using fallback data:', action.payload);
              })
              // Fetch single product
              .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload;
                state.error = null;
              })
              .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
              });
          },
});

export const { clearError, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
