import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import {
  addToFavourites,
  removeFromFavourites,
  fetchFavourites,
  clearFavourites,
  toggleFavourite,
  clearError,
  moveToCart,
  syncWithBackend,
} from '@/store/features/favourite-slice';
import { Product } from '@/types/types';

export const useFavourites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, error } = useSelector((state: any) => state.favourites);

  const addToFavouritesHandler = useCallback(
    (product: Product) => {
      dispatch(addToFavourites(product));
    },
    [dispatch]
  );

  const removeFromFavouritesHandler = useCallback(
    (productId: number) => {
      dispatch(removeFromFavourites(productId));
    },
    [dispatch]
  );

  const fetchFavouritesHandler = useCallback(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  const clearFavouritesHandler = useCallback(() => {
    dispatch(clearFavourites());
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
      return items.some(item => item.id === productId);
    },
    [items]
  );

  const getFavouritesCount = useCallback(() => {
    return items.length;
  }, [items]);

  return {
    // State
    favourites: items,
    isLoading,
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
