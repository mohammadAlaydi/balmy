import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FavouriteState, Product } from "@/types/types";
import { buildApiUrl, API_CONFIG } from "@/lib/config";

// Helper functions for local storage
const saveFavourites = (favourites: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
};

const getStoredFavourites = (): Product[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

// Requests are proxied through Next.js API routes with httpOnly cookies
const makeAuthenticatedRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  return response;
};

// Async thunks
export const addToFavourites = createAsyncThunk(
  "favourites/add",
  async (product: Product, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeAuthenticatedRequest(
        `/api/wishlist/${product.product_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to add to favourites");
      }

      return product;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to add to favourites"
      );
    }
  }
);

export const removeFromFavourites = createAsyncThunk(
  "favourites/remove",
  async (productId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeAuthenticatedRequest(
        `/api/wishlist/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(
          error.message || "Failed to remove from favourites"
        );
      }

      return productId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to remove from favourites"
      );
    }
  }
);

export const fetchFavourites = createAsyncThunk(
  "favourites/fetch",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeAuthenticatedRequest(`/api/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to fetch favourites");
      }

      const data = await response.json();

      // Handle the actual API response structure: { data: [...] }
      if (data.data && Array.isArray(data.data)) {
        // Extract products from wishlist items
        const products = data.data.map((item: any) => ({
          id: item?.product?.id,
          name: item.product.name,
          nameEn: item.product.name, // Fallback for English name
          price: parseFloat(item.product.price) || 0,
          formatted_price: item.product.formatted_price,
          priceEn: item.product.formatted_price || item.product.price,
          code: item.product.sku || "",
          images: item.product.images || [],
          base_image: item.product.base_image,
          category: item.product.type || "Unknown",
          in_stock: item.product.in_stock || false,
          inStock: item.product.in_stock || false, // Keep both for compatibility
          rating: item.product.reviews?.average_rating || 0,
          reviews: {
            total: item.product.reviews?.total || 0,
            average_rating: item.product.reviews?.average_rating || 0,
          },
          description:
            item.product.short_description || item.product.description || "",
          // Add wishlist specific data
          item_id: item.id,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));
        return products;
      }

      // Fallback to old structure or empty array
      const fallbackItems = data.items || data || [];
      return fallbackItems;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch favourites"
      );
    }
  }
);

export const clearFavourites = createAsyncThunk(
  "favourites/clear",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await makeAuthenticatedRequest(`/api/wishlist/all`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to clear favourites");
      }

      return true;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to clear favourites"
      );
    }
  }
);

export const moveToCart = createAsyncThunk(
  "favourites/moveToCart",
  async (wishlistId: number, { rejectWithValue, dispatch }) => {
    try {
      // First, get the product ID from the wishlist item
      const wishlistResponse = await makeAuthenticatedRequest(`/api/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!wishlistResponse.ok) {
        const error = await wishlistResponse.json();
        return rejectWithValue(error.message || "Failed to fetch wishlist");
      }

      const wishlistData = await wishlistResponse.json();
      const wishlistItem = wishlistData.data?.find(
        (item: any) => item.id === wishlistId
      );

      if (!wishlistItem) {
        return rejectWithValue("Wishlist item not found");
      }

      const productId = wishlistItem.product.id;

      // Now add the product to cart
      const response = await makeAuthenticatedRequest(`/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to add to cart");
      }

      const data = await response.json();

      // Remove from wishlist after successfully adding to cart
      const removeResponse = await makeAuthenticatedRequest(`/api/wishlist/${wishlistItem.product.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!removeResponse.ok) {
        console.warn("Failed to remove from wishlist, but item was added to cart");
      }

      // After successfully moving to cart, refresh both cart and favourites data
      const { getCartProducts } = await import("./cart-slice");
      dispatch(getCartProducts());
      
      // Refresh favourites to remove the moved item
      dispatch(fetchFavourites());

      return { wishlistId, cartData: data.data };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to move to cart"
      );
    }
  }
);

// Initialize state with empty array (no local storage fallback)
const initialState: FavouriteState = {
  items: [],
  loading: false,
  error: null,
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    toggleFavourite: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id
      );

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
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addToFavourites.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          const product = action.payload;

          // Only add if not already present
          const existingIndex = state.items.findIndex(
            (item) => item.id === product.id
          );
          if (existingIndex === -1) {
            state.items.push(product);
          }

          state.error = null;
        }
      )
      .addCase(addToFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Remove from favourites
    builder
      .addCase(removeFromFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeFromFavourites.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          const productId = action.payload;
          state.items = state.items.filter((item) => item.id !== productId);
          state.error = null;
        }
      )
      .addCase(removeFromFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch favourites
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFavourites.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.items = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Clear favourites
    builder
      .addCase(clearFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearFavourites.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.error = null;
      })
      .addCase(clearFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Move to cart
    builder
      .addCase(moveToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        moveToCart.fulfilled,
        (
          state,
          action: PayloadAction<{ wishlistId: number; cartData: any }>
        ) => {
          state.loading = false;
          // Remove the item from favourites after moving to cart
          state.items = state.items.filter(
            (item) => item.id !== action.payload.wishlistId
          );
          state.error = null;
        }
      )
      .addCase(moveToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, toggleFavourite, initializeFromStorage } =
  favouriteSlice.actions;

// Action to sync with backend (no longer needed but kept for compatibility)
export const syncWithBackend = createAsyncThunk(
  "favourites/syncWithBackend",
  async (_, { dispatch }) => {
    // Simply fetch fresh data from backend
    dispatch(fetchFavourites());
  }
);

export default favouriteSlice.reducer;
