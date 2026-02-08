"use client";

import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "@/store/store";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveWishlistToCart,
} from "@/store/slices/wishlist-slice";

export function useFavourites() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("favourites");
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "ar";

  const { items: favourites, isLoading, error } = useSelector(
    (state: RootState) => state.wishlist
  );

  /** Fetch favourites from the API */
  const fetchFavourites = useCallback(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  /** Check whether a product is in the favourites list */
  const isFavourite = useCallback(
    (productId: number): boolean => {
      return favourites.some(
        (item: any) =>
          item?.id === productId ||
          item?.product_id === productId ||
          item?.product?.id === productId
      );
    },
    [favourites]
  );

  /** Add a product to favourites */
  const addToFavourites = useCallback(
    async (product: any) => {
      const id = product?.id || product?.product_id;
      if (!id) return;
      await dispatch(addToWishlist(Number(id))).unwrap();
    },
    [dispatch]
  );

  /** Remove a product from favourites */
  const removeFromFavourites = useCallback(
    async (productId: number) => {
      await dispatch(removeFromWishlist(productId)).unwrap();
    },
    [dispatch]
  );

  /** Handler that removes and shows a toast (used by the page) */
  const handleRemoveFromFavourites = useCallback(
    async (productId: number) => {
      try {
        await removeFromFavourites(productId);
        toast.success(t("productRemoved"));
      } catch {
        toast.error(t("errorTitle"));
      }
    },
    [removeFromFavourites, t]
  );

  /** Clear all favourites */
  const handleClearAll = useCallback(async () => {
    try {
      // Remove each item individually since there is no bulk-clear endpoint
      await Promise.all(
        favourites.map((item: any) => {
          const id = item?.id || item?.product_id;
          return id ? dispatch(removeFromWishlist(Number(id))).unwrap() : null;
        })
      );
      toast.success(t("allCleared"));
    } catch {
      toast.error(t("errorTitle"));
    }
  }, [favourites, dispatch, t]);

  /** Get the count of favourites */
  const getFavouritesCount = useCallback((): number => {
    return favourites?.length ?? 0;
  }, [favourites]);

  /** Move an item from favourites (wishlist) to cart using the dedicated Markatty endpoint */
  const moveToCart = useCallback(
    async (wishlistItemId: string | number) => {
      // Find the wishlist item to get both itemId and productId
      const item = favourites.find(
        (f: any) => f?.id === Number(wishlistItemId) || f?.product_id === Number(wishlistItemId)
      );
      const itemId = item?.id || Number(wishlistItemId);
      const productId = item?.product_id || item?.product?.id || Number(wishlistItemId);
      await dispatch(moveWishlistToCart({ itemId, productId, qty: 1 })).unwrap();
    },
    [dispatch, favourites]
  );

  return useMemo(
    () => ({
      favourites,
      isLoading,
      error,
      t,
      locale,
      isFavourite,
      addToFavourites,
      removeFromFavourites,
      handleRemoveFromFavourites,
      handleClearAll,
      getFavouritesCount,
      fetchFavourites,
      moveToCart,
    }),
    [
      favourites,
      isLoading,
      error,
      t,
      locale,
      isFavourite,
      addToFavourites,
      removeFromFavourites,
      handleRemoveFromFavourites,
      handleClearAll,
      getFavouritesCount,
      fetchFavourites,
      moveToCart,
    ]
  );
}
