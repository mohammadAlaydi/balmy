"use client";

import Link from "next/link";
import { FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { useFavourites } from "@/hooks/use-favourites";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/section-title";
import { ProtectedRoute } from "@/components/auth/protected-route";
import ProductCard from "@/components/product-card";
import Loading from "@/components/loading";
import ErrorComponent from "@/features/favourites/error-component";

function FavouritePageContent() {
  const {
    t,
    isLoading,
    favourites,
    error,
    locale,
    getFavouritesCount,
    handleClearAll,
    handleRemoveFromFavourites,
  } = useFavourites();

  if (isLoading) return <Loading fullScreen variant="spinner" size="xl" />;

  if (error) return <ErrorComponent t={t} error={error} locale={locale} />;

  const hasFavourites = favourites.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <SectionTitle
          title={t("title")}
          titleStyle="text-3xl font-bold text-gray-900 mb-2"
        />
        <p className="text-gray-600">{t("subtitle")}</p>
      </div>

      {/* Empty State */}
      {!hasFavourites ? (
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
          {/* Favourites Header */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <FaHeart className="h-5 w-5 text-red-500" />
              <span className="text-lg font-medium text-gray-700">
                {t("favouritesCount", { count: getFavouritesCount() })}
              </span>
            </div>

            <Button
              onClick={handleClearAll}
              variant="outline"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1"
            >
              <FaTrashAlt className="h-4 w-4" />
              {t("clearAll")}
            </Button>
          </div>

          {/* Favourites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favourites.map((product) => (
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
                  aria-label={t("remove-from-favourites")}
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
