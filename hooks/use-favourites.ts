import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  addToFavourites,
  removeFromFavourites,
  fetchFavourites,
  clearFavourites,
  toggleFavourite,
  clearError,
  moveToCart,
  syncWithBackend,
} from "@/store/slices/favourite-slice";
import { Product } from "@/types/types";

export const useFavourites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: any) => state.favourites
  );

  const addToFavouritesHandler = useCallback(
    async (product: Product) => {
      const result = await dispatch(addToFavourites(product));
      if (addToFavourites.rejected.match(result)) {
        throw (result.payload as string) || "Failed to add to favourites";
      }
      return result;
    },
    [dispatch]
  );

  const removeFromFavouritesHandler = useCallback(
    async (productId: number) => {
      const result = await dispatch(removeFromFavourites(productId));
      if (removeFromFavourites.rejected.match(result)) {
        throw (result.payload as string) || "Failed to remove from favourites";
      }
      return result;
    },
    [dispatch]
  );

  const fetchFavouritesHandler = useCallback(async () => {
    const result = await dispatch(fetchFavourites());
    if (fetchFavourites.rejected.match(result)) {
      throw (result.payload as string) || "Failed to fetch favourites";
    }
    return result;
  }, [dispatch]);

  const clearFavouritesHandler = useCallback(async () => {
    const result = await dispatch(clearFavourites());
    if (clearFavourites.rejected.match(result)) {
      throw (result.payload as string) || "Failed to clear favourites";
    }
    return result;
  }, [dispatch]);

  const moveToCartHandler = useCallback(
    async (wishlistId: number) => {
      const result = await dispatch(moveToCart(wishlistId));
      if (moveToCart.rejected.match(result)) {
        throw new Error(result.payload as string);
      }
      return result;
    },
    [dispatch]
  );

  const syncWithBackendHandler = useCallback(() => {
    dispatch(syncWithBackend());
  }, [dispatch]);

  const toggleFavouriteHandler = useCallback(
    (product: Product) => {
      dispatch(toggleFavourite(product));
    },
    [dispatch]
  );

  const clearErrorHandler = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const isFavourite = useCallback(
    (productId: number) => {
      return items.some((item: any) => item.id === productId);
    },
    [items]
  );

  const getFavouritesCount = useCallback(() => {
    return items.length;
  }, [items]);

  return {
    // State
    favourites: items,
    isLoading: loading,
    error,

    // Actions
    addToFavourites: addToFavouritesHandler,
    removeFromFavourites: removeFromFavouritesHandler,
    fetchFavourites: fetchFavouritesHandler,
    clearFavourites: clearFavouritesHandler,
    moveToCart: moveToCartHandler,
    toggleFavourite: toggleFavouriteHandler,
    clearError: clearErrorHandler,
    syncWithBackend: syncWithBackendHandler,

    // Computed
    isFavourite,
    getFavouritesCount,
  };
};
