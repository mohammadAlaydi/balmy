"use client";

import React, { useState, useMemo, useEffect } from "react";
import { BreadcrumbBalmy } from "@/components/balmy";
import ProductCard from "@/components/ProductCard";
import SideFilter from "@/components/offers/side-filter";
import Loading from "@/components/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategory from "@/hooks/use-category";

type Props = { categoryId: string | number };

export default function CategoryPageClient({ categoryId }: Props) {
  const { loading, error, t, categoryProducts } = useCategory(categoryId);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("suggestions");
  const [visibleCount, setVisibleCount] = useState(9); // Initial visible count

  const products = categoryProducts?.data || [];

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      // Rating filter
      if (selectedRatings.length > 0) {
        const productRating = product.reviews?.average_rating || 0;
        const matchesRating = selectedRatings.some(
          (rating) => Math.floor(productRating) === rating
        );
        if (!matchesRating) return false;
      }

      // Brand filter (if you have brand data)
      // if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      //     return false;
      // }

      return true;
    });
  }, [products, selectedRatings, selectedBrands]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(9);
  }, [selectedCategories, selectedRatings, selectedPriceRanges, selectedBrands, sortBy]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case "price-low-high":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => {
          const ratingA = a.reviews?.average_rating || 0;
          const ratingB = b.reviews?.average_rating || 0;
          return ratingB - ratingA;
        });
      case "newest":
        return sorted.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  if (loading) {
    return <Loading fullScreen variant="spinner" size="xl" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-base md:text-lg xl:text-xl text-center text-red-600">
          {t("error-loading-products") || "Error loading products. Please try again."}
        </p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "الرئيسية", href: "/home" },
    { label: categoryProducts?.category?.name || "التصنيف", href: `/category/${categoryId}` },
  ];

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="container mx-auto px-4 py-40 ">
        {/* Breadcrumb and Filter Button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex-1">
            <BreadcrumbBalmy items={breadcrumbItems} className="justify-start" />
          </div>
          <div className="lg:hidden">
            <SideFilter
              selectedCategories={selectedCategories}
              selectedRatings={selectedRatings}
              selectedPriceRanges={selectedPriceRanges}
              selectedBrands={selectedBrands}
              onCategoryChange={setSelectedCategories}
              onRatingChange={setSelectedRatings}
              onPriceChange={setSelectedPriceRanges}
              onBrandChange={setSelectedBrands}
            />
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Right Column - Sidebar (25%) */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-6">
              <SideFilter
                selectedCategories={selectedCategories}
                selectedRatings={selectedRatings}
                selectedPriceRanges={selectedPriceRanges}
                selectedBrands={selectedBrands}
                onCategoryChange={setSelectedCategories}
                onRatingChange={setSelectedRatings}
                onPriceChange={setSelectedPriceRanges}
                onBrandChange={setSelectedBrands}
              />
            </div>
          </aside>
          {/* Vertical separator line - only visible on desktop */}
          <div className="hidden lg:block absolute top-0 bottom-0 w-px bg-gray-300" style={{ right: "calc(25% - 1rem)" }}></div>

          {/* Left Column - Main Content (75%) */}
          <main className="lg:w-3/4 w-full">
            {/* Top Bar */}
            <div className="mb-6 flex flex-col md:flex-row justify-end items-start md:items-center gap-4">
              {/* Removed Breadcrumb from here */}

              {/* Left: Sort Select */}
              <div className="order-2 flex items-center gap-3">
                <span className="text-sm font-medium text-black">ترتيب:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="اختر الترتيب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestions">الاقتراحات</SelectItem>
                    <SelectItem value="price-low-high">
                      السعر: من الأقل للأعلى
                    </SelectItem>
                    <SelectItem value="price-high-low">
                      السعر: من الأعلى للأقل
                    </SelectItem>
                    <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                    <SelectItem value="newest">الأحدث</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Count */}
            <div className="mb-6">
              <p className="text-sm text-medium-gray">
                عرض {sortedProducts.length} من المنتجات
              </p>
            </div>

            {/* Product Grid - 3 products per row on desktop */}
            {visibleProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {visibleProducts.map((product: any) => (
                    <div key={product.id} className="w-full max-w-sm mx-auto">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < sortedProducts.length && (
                  <div className="flex justify-center mt-8">
                    <button
                      className="bg-black text-white px-12 py-3 rounded-lg font-medium hover:bg-dark-gray-3 transition-colors duration-300"
                      onClick={handleLoadMore}
                    >
                      تحميل المزيد
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 text-center min-h-[65vh]">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-black mb-2">
                  لا توجد نتائج
                </h3>
                <p className="text-medium-gray">
                  {selectedRatings.length > 0 || selectedBrands.length > 0
                    ? "حاول تغيير الفلاتر أو البحث عن منتجات أخرى"
                    : t("no-products-found") || "لا توجد منتجات في هذا التصنيف"}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
