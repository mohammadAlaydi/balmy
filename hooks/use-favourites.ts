"use client";

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import type { AppDispatch, RootState } from "@/store/store";
import type { Product } from "@/types/types";

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

export const useFavourites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("favourites");

  const { items, loading, error } = useSelector(
    (state: RootState) => state.favourites
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user;

  // ------------------------- Actions -------------------------

  const addToFavouritesHandler = useCallback(
    async (product: Product) => {
      const result = await dispatch(addToFavourites(product));
      if (addToFavourites.rejected.match(result)) {
        throw (result.payload as string) || t("errorAddingProduct");
      }
      return result;
    },
    [dispatch]
  );

  const removeFromFavouritesHandler = useCallback(
    async (productId: number) => {
      const result = await dispatch(removeFromFavourites(productId));
      if (removeFromFavourites.rejected.match(result)) {
        throw (result.payload as string) || t("errorRemovingProduct");
      }
      return result;
    },
    [dispatch]
  );

  const fetchFavouritesHandler = useCallback(async () => {
    const result = await dispatch(fetchFavourites());
    if (fetchFavourites.rejected.match(result)) {
      throw (result.payload as string) || t("errorFetchingProducts");
    }
    return result;
  }, [dispatch]);

  const clearFavouritesHandler = useCallback(async () => {
    const result = await dispatch(clearFavourites());
    if (clearFavourites.rejected.match(result)) {
      throw (result.payload as string) || t("errorClearingAll");
    }
    return result;
  }, [dispatch]);

  const moveToCartHandler = useCallback(
    async (wishlistId: number) => {
      const result = await dispatch(moveToCart(wishlistId));
      if (moveToCart.rejected.match(result)) {
        throw new Error((result.payload as string) || t("errorMovingToCart"));
      }
      return result;
    },
    [dispatch]
  );

  const toggleFavouriteHandler = useCallback(
    (product: Product) => dispatch(toggleFavourite(product)),
    [dispatch]
  );

  const clearErrorHandler = useCallback(() => dispatch(clearError()), [dispatch]);

  const syncWithBackendHandler = useCallback(() => dispatch(syncWithBackend()), [
    dispatch,
  ]);

  // ----------------------- Computed -------------------------

  const isFavourite = useCallback(
    (productId: number) => items.some((item) => item.id === productId),
    [items]
  );

  const getFavouritesCount = useCallback(() => items.length, [items]);

  // ------------------------ Effects -------------------------

  // Only run once on mount
  useEffect(() => {
    if (!isAuthenticated) return;

    const init = async () => {
      try {
        await dispatch(fetchFavourites());
        dispatch(syncWithBackend());
      } catch (err) {
        // ignore errors on initial fetch
      }
    };

    init();
    // Empty deps so it runs only on mount
  }, [dispatch, isAuthenticated]);

  // ------------------------ Helpers -------------------------

  const handleRemoveFromFavourites = useCallback(
    async (productId: number) => {
      try {
        await removeFromFavouritesHandler(productId);
        toast.success(t("productRemoved"));
        setTimeout(fetchFavouritesHandler, 500);
      } catch {
        toast.error(t("errorRemovingProduct"));
      }
    },
    [removeFromFavouritesHandler, fetchFavouritesHandler]
  );

  const handleClearAll = useCallback(async () => {
    try {
      await clearFavouritesHandler();
      toast.success(t("allCleared"));
      setTimeout(fetchFavouritesHandler, 500);
    } catch {
      toast.error(t("errorClearingAll"));
    }
  }, [clearFavouritesHandler, fetchFavouritesHandler]);

  return {
    t,
    favourites: items,
    isLoading: loading,
    error,
    isAuthenticated,
    locale: "ar", // or read from next-intl params if needed
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
    handleRemoveFromFavourites,
    handleClearAll,
  };
};
