"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Wifi, AlertCircle } from "lucide-react";
import { FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { useFavourites } from "@/hooks/use-favourites";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/section-title";
import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { buildApiUrl, API_CONFIG } from "@/lib/config";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductCard from "@/components/product-card";
import { ProductDetailsResponse } from "@/types/types";

function FavouritePageContent() {
  
  const t = useTranslations("favourites");
  const router = useRouter();

  const {
    favourites,
    isLoading,
    error,
    fetchFavourites,
    removeFromFavourites,
    clearFavourites,
    moveToCart,
    getFavouritesCount,
  } = useFavourites();

  const [backendStatus, setBackendStatus] = useState<
    "connected" | "disconnected" | "checking"
  >("checking");
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [movingToCart, setMovingToCart] = useState<number | null>(null);

  // Authentication state
  const { isAuthenticated: reduxAuth, user } = useSelector(
    (state: RootState) => state.auth
  );
  const isAuthenticated = !!user; // Rely on Redux auth slice (cookies)

  // Check backend connectivity
  const checkBackendStatus = async () => {
    setBackendStatus("checking");
    try {
      const response = await fetch(`/api/wishlist`, { method: "HEAD" });

      if (response.ok) {
        setBackendStatus("connected");
        setLastSync(new Date());
      } else if (response.status === 401) {
        setBackendStatus("connected"); // Auth issue, but backend is alive
      } else {
        setBackendStatus("disconnected");
      }
    } catch (error) {
      setBackendStatus("disconnected");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkBackendStatus();
      fetchFavourites();
    }
  }, [fetchFavourites, isAuthenticated, reduxAuth, user]);

  const handleRemoveFromFavourites = async (productId: number) => {
    try {
      await removeFromFavourites(productId);
      toast.success(t("productRemoved"));
      setTimeout(() => fetchFavourites(), 500);
    } catch (error) {
      if (error && typeof error === "string" && error.includes("login")) {
        toast.error("Please login to manage favourites");
      } else {
        toast.error(t("errorRemovingProduct"));
      }
    }
  };

  const handleClearAll = async () => {
    try {
      await clearFavourites();
      toast.success(t("allCleared"));
      setTimeout(() => fetchFavourites(), 500);
    } catch (error) {
      if (error && typeof error === "string" && error.includes("login")) {
        toast.error("Please login to manage favourites");
      } else {
        toast.error(t("errorClearingAll"));
      }
    }
  };

  const handleMoveToCart = async (product: ProductDetailsResponse) => {
    try {
      setMovingToCart(product.id);
      const wishlistId = product.wishlistId ?? product.id;
      await moveToCart(wishlistId);
      toast.success(t("movedToCart"));
      setTimeout(() => fetchFavourites(), 500);
    } catch (error) {
      if (error && typeof error === "string" && error.includes("login")) {
        toast.error("Please login to move items to cart");
      } else {
        toast.error(t("errorMovingToCart"));
      }
    } finally {
      setMovingToCart(null);
    }
  };

  if (isLoading && favourites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">{t("loadingFavourites")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && favourites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {t("errorTitle")}
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>

          {error.includes("Please login") && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
              <p className="text-red-800 text-sm">
                <strong>Authentication Required:</strong> Please login to access
                your favourites.
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-center flex-wrap">
            <Button asChild variant="outline">
              <Link href="/auth/login" prefetch={true}>
                {t("loginAgain")}
              </Link>
            </Button>
            <Button onClick={checkBackendStatus} variant="outline">
              <Wifi className="h-4 w-4 mr-2" />
              {t("checkConnection")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SectionTitle
          title={t("title")}
          titleStyle="text-3xl font-bold text-gray-900 mb-2"
        />
        <p className="text-gray-600">{t("subtitle")}</p>
      </div>

      {favourites.length === 0 ? (
        <div className="text-center py-16">
          <FaRegHeart className="mx-auto h-24 w-24 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {t("emptyTitle")}
          </h3>
          <p className="text-gray-500 mb-6">{t("emptySubtitle")}</p>
          <Button asChild>
            <Link href="/" prefetch={true}>
              {t("startShopping")}
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <FaHeart className="h-5 w-5 text-red-500" />
              <span className="text-lg font-medium text-gray-700">
                {t("favouritesCount", { count: getFavouritesCount() })}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleClearAll}
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <FaTrashAlt className="h-4 w-4 mr-2" />
                {t("clearAll")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favourites.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} cardColSpan="col-span-1" />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveFromFavourites(product.id)}
                >
                  <FaTrashAlt className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FavouritePage() {
  return (
    <ProtectedRoute>
      <FavouritePageContent />
    </ProtectedRoute>
  );
}
