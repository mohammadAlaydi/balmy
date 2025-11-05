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
    [dispatch, t]
  );

  const removeFromFavouritesHandler = useCallback(
    async (productId: number) => {
      const result = await dispatch(removeFromFavourites(productId));
      if (removeFromFavourites.rejected.match(result)) {
        throw (result.payload as string) || t("errorRemovingProduct");
      }
      return result;
    },
    [dispatch, t]
  );

  const fetchFavouritesHandler = useCallback(async () => {
    if (!isAuthenticated) return;
    await dispatch(fetchFavourites());
  }, [dispatch, isAuthenticated]);

  const clearFavouritesHandler = useCallback(async () => {
    const result = await dispatch(clearFavourites());
    if (clearFavourites.rejected.match(result)) {
      throw (result.payload as string) || t("errorClearingAll");
    }
    return result;
  }, [dispatch, t]);

  const moveToCartHandler = useCallback(
    async (wishlistId: number) => {
      const result = await dispatch(moveToCart(wishlistId));
      if (moveToCart.rejected.match(result)) {
        throw new Error((result.payload as string) || t("errorMovingToCart"));
      }
      return result;
    },
    [dispatch, t]
  );

  const toggleFavouriteHandler = useCallback(
    (product: Product) => dispatch(toggleFavourite(product)),
    [dispatch]
  );

  const clearErrorHandler = useCallback(() => dispatch(clearError()), [dispatch]);
  const syncWithBackendHandler = useCallback(() => dispatch(syncWithBackend()), [dispatch]);

  // ----------------------- Computed -------------------------

  const isFavourite = useCallback(
    (productId: number) => items.some((item) => item.id === productId),
    [items]
  );

  const getFavouritesCount = useCallback(() => items.length, [items]);

  // ------------------------ Effects -------------------------

  useEffect(() => {
    fetchFavouritesHandler();
    syncWithBackendHandler();
  }, [fetchFavouritesHandler, syncWithBackendHandler]);

  // ------------------------ Helpers -------------------------

  const handleRemoveFromFavourites = useCallback(
    async (productId: number) => {
      try {
        await removeFromFavouritesHandler(productId);
        toast.success(t("productRemoved"));
      } catch {
        toast.error(t("errorRemovingProduct"));
      }
    },
    [removeFromFavouritesHandler, t]
  );

  const handleClearAll = useCallback(async () => {
    try {
      await clearFavouritesHandler();
      toast.success(t("allCleared"));
    } catch {
      toast.error(t("errorClearingAll"));
    }
  }, [clearFavouritesHandler, t]);

  return {
    t,
    favourites: items,
    isLoading: loading,
    error,
    isAuthenticated,
    locale: "ar",
    addToFavourites: addToFavouritesHandler,
    removeFromFavourites: removeFromFavouritesHandler,
    fetchFavourites: fetchFavouritesHandler,
    clearFavourites: clearFavouritesHandler,
    moveToCart: moveToCartHandler,
    toggleFavourite: toggleFavouriteHandler,
    clearError: clearErrorHandler,
    syncWithBackend: syncWithBackendHandler,
    isFavourite,
    getFavouritesCount,
    handleRemoveFromFavourites,
    handleClearAll,
  };
};
