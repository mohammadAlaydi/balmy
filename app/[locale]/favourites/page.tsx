"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Wifi } from "lucide-react";
import { FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/section-title";
import ProductCard from "@/components/product-card";
import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useFavourites } from "@/hooks/use-favourites";

function FavouritePageContent() {
  const {
    favourites,
    isLoading,
    error,
    t,
    locale,
    handleRemoveFromFavourites,
    handleClearAll,
    getFavouritesCount,
  } = useFavourites();

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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {t("errorTitle")}
        </h2>
        <p className="text-gray-600 mb-4">{error}</p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button asChild variant="outline">
            <Link href={`/${locale}/auth/login`} prefetch>
              {t("loginAgain")}
            </Link>
          </Button>
          <Button
            onClick={() => toast.info(t("checkingConnection"))}
            variant="outline"
          >
            <Wifi className="h-4 w-4 mr-2" />
            {t("checkConnection")}
          </Button>
        </div>
      </div>
    );
  }
  if (favourites.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full min-h-[65vh]">
        <p className="text-base md:text-lg xl:text-xl text-center">
          {t("no-data-found")}
        </p>
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
            <Link href={`/${locale}`} prefetch>
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
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <FaTrashAlt className="h-4 w-4 mr-2" />
              {t("clearAll")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favourites.map((product: any) => (
              <div key={product.id} className="relative group">
                <ProductCard
                  product={product}
                  cardColSpan="col-span-1"
                  wishlistId={product.item_id}
                  wishlistProductId={product.id}
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 ltr:left-2 rtl:right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
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

export default function page() {
  return (
    <ProtectedRoute>
      <FavouritePageContent />
    </ProtectedRoute>
  );
}
