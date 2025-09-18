import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FavouriteState, Product } from '@/types/types';
import { buildApiUrl, API_CONFIG } from '@/lib/config';

// Helper functions for local storage
const saveFavourites = (favourites: Product[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }
};

const getStoredFavourites = (): Product[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const stored = localStorage.getItem('favourites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

// Helper function to check authentication
const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
};

// Helper function to handle API calls with token refresh
const makeAuthenticatedRequest = async (url: string, options: RequestInit, dispatch: any) => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('Please login to manage favourites');
  }

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  // If we get a 401, try to refresh the token
  if (response.status === 401) {
    try {
      // Import the refresh token action dynamically to avoid circular dependency
      const { refreshToken } = await import('../features/auth-slice');
      const refreshResult = await dispatch(refreshToken());
      
      if (refreshResult.meta.requestStatus === 'fulfilled') {
        // Retry with new token
        const newToken = localStorage.getItem('accessToken');
        if (newToken) {
          response = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              'Authorization': `Bearer ${newToken}`,
            },
          });
        }
      }
    } catch (refreshError) {
      // If refresh fails, throw the original error
      throw new Error('Authentication failed. Please login again.');
    }
  }

  return response;
};

// Async thunks
export const addToFavourites = createAsyncThunk(
  'favourites/add',
  async (product: Product, { rejectWithValue, dispatch }) => {
    try {
      const apiUrl = buildApiUrl(`${API_CONFIG.ENDPOINTS.WISHLIST}/${product.id}`);
      
      const response = await makeAuthenticatedRequest(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }, dispatch);

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to add to favourites');
      }

      return product;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add to favourites');
    }
  }
);

export const removeFromFavourites = createAsyncThunk(
  'favourites/remove',
  async (productId: number, { rejectWithValue, dispatch }) => {
    try {
      const apiUrl = buildApiUrl(`${API_CONFIG.ENDPOINTS.WISHLIST}/${productId}`);
      
      const response = await makeAuthenticatedRequest(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }, dispatch);

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to remove from favourites');
      }

      return productId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to remove from favourites');
    }
  }
);

export const fetchFavourites = createAsyncThunk(
  'favourites/fetch',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const apiUrl = buildApiUrl(API_CONFIG.ENDPOINTS.WISHLIST);
      
      const response = await makeAuthenticatedRequest(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }, dispatch);

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch favourites');
      }

      const data = await response.json();
      
      // Handle the actual API response structure: { data: [...] }
      if (data.data && Array.isArray(data.data)) {
        // Extract products from wishlist items
        const products = data.data.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          nameEn: item.product.name, // Fallback for English name
          price: parseFloat(item.product.price) || 0,
          formatted_price: item.product.formatted_price,
          priceEn: item.product.formatted_price || item.product.price,
          code: item.product.sku || '',
          images: item.product.images || [],
          base_image: item.product.base_image,
          category: item.product.type || 'Unknown',
          in_stock: item.product.in_stock || false,
          inStock: item.product.in_stock || false, // Keep both for compatibility
          rating: item.product.reviews?.average_rating || 0,
          reviews: {
            total: item.product.reviews?.total || 0,
            average_rating: item.product.reviews?.average_rating || 0
          },
          description: item.product.short_description || item.product.description || '',
          // Add wishlist specific data
          wishlistId: item.id,
          createdAt: item.created_at,
          updatedAt: item.updated_at
        }));
        return products;
      }
      
      // Fallback to old structure or empty array
      const fallbackItems = data.items || data || [];
      return fallbackItems;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch favourites');
    }
  }
);

export const clearFavourites = createAsyncThunk(
  'favourites/clear',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const apiUrl = buildApiUrl(`${API_CONFIG.ENDPOINTS.WISHLIST}/all`);
      
      const response = await makeAuthenticatedRequest(apiUrl, {
        method: 'DELETE',
      }, dispatch);

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to clear favourites');
      }

      return true;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to clear favourites');
    }
  }
);

export const moveToCart = createAsyncThunk(
  'favourites/moveToCart',
  async (wishlistId: number, { rejectWithValue, dispatch }) => {
    try {
      // First, get the product ID from the wishlist item
      const wishlistUrl = buildApiUrl(`${API_CONFIG.ENDPOINTS.WISHLIST}`);
      const wishlistResponse = await makeAuthenticatedRequest(wishlistUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }, dispatch);

      if (!wishlistResponse.ok) {
        const error = await wishlistResponse.json();
        return rejectWithValue(error.message || 'Failed to fetch wishlist');
      }

      const wishlistData = await wishlistResponse.json();
      const wishlistItem = wishlistData.data?.find((item: any) => item.id === wishlistId);
      
      if (!wishlistItem) {
        return rejectWithValue('Wishlist item not found');
      }

      const productId = wishlistItem.product.id;
      
      // Now add the product to cart
      const cartUrl = buildApiUrl(`/api/v1/customer/cart/add/${productId}`);
      const response = await makeAuthenticatedRequest(cartUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: 1,
        }),
      }, dispatch);

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to add to cart');
      }

      const data = await response.json();
      
      // Remove from wishlist after successfully adding to cart
      const removeUrl = buildApiUrl(`${API_CONFIG.ENDPOINTS.WISHLIST}/${wishlistId}`);
      await makeAuthenticatedRequest(removeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }, dispatch);
      
      // After successfully moving to cart, refresh the cart data
      const { getCartProducts } = await import('./cart-slice');
      dispatch(getCartProducts());
      
      return { wishlistId, cartData: data.data };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to move to cart');
    }
  }
);

// Initialize state with empty array (no local storage fallback)
const initialState: FavouriteState = {
  items: [],
  isLoading: false,
  error: null,
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    toggleFavourite: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingIndex >= 0) {
        // Remove from favourites
        state.items.splice(existingIndex, 1);
      } else {
        // Add to favourites
        state.items.push(product);
      }
    },
    initializeFromStorage: (state) => {
      // No longer initializing from local storage
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    // Add to favourites
    builder
      .addCase(addToFavourites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavourites.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isLoading = false;
        const product = action.payload;
        
        // Only add if not already present
        const existingIndex = state.items.findIndex(item => item.id === product.id);
        if (existingIndex === -1) {
          state.items.push(product);
        }
        
        state.error = null;
      })
      .addCase(addToFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Remove from favourites
    builder
      .addCase(removeFromFavourites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromFavourites.fulfilled, (state, action: PayloadAction<number>) => {
        state.isLoading = false;
        const productId = action.payload;
        state.items = state.items.filter(item => item.id !== productId);
        state.error = null;
      })
      .addCase(removeFromFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch favourites
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Clear favourites
    builder
      .addCase(clearFavourites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearFavourites.fulfilled, (state) => {
        state.isLoading = false;
        state.items = [];
        state.error = null;
      })
      .addCase(clearFavourites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Move to cart
    builder
      .addCase(moveToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(moveToCart.fulfilled, (state, action: PayloadAction<{ wishlistId: number; cartData: any }>) => {
        state.isLoading = false;
        // Remove the item from favourites after moving to cart
        state.items = state.items.filter(item => item.wishlistId !== action.payload.wishlistId);
        state.error = null;
      })
      .addCase(moveToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, toggleFavourite, initializeFromStorage } = favouriteSlice.actions;

// Action to sync with backend (no longer needed but kept for compatibility)
export const syncWithBackend = createAsyncThunk(
  'favourites/syncWithBackend',
  async (_, { dispatch }) => {
    // Simply fetch fresh data from backend
    dispatch(fetchFavourites());
  }
);

export default favouriteSlice.reducer;
