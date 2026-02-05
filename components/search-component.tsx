"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import ProductCard from "./ProductCard";
import Loading from "./loading";

import useSearch from "@/hooks/use-search";

interface SearchComponentProps {
  maxHeight?: string;
}

/**
 * Product search and filter component.
 */
const SearchComponent: React.FC<SearchComponentProps> = ({ maxHeight }) => {
  const {
    isLoading,
    loading,
    t,
    search,
    setSearch,
    categories,
    categoryIndex,
    setSearchCategory,
    setCategoryIndex,
    searchCategory,
    filteredProducts,
  } = useSearch();

  // =============================
  // ⏳ Loading State
  // =============================
  if (isLoading || loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <Loading fullScreen variant="spinner" size="xl" />
      </div>
    );
  }

  // =============================
  // 🧭 Clear Filters Handler
  // =============================
  const handleClearFilters = () => {
    setSearch("");
    setSearchCategory("");
    setCategoryIndex(null);
  };
  console.log(searchCategory, "✨✨✨✨✨✨✨✨", filteredProducts);
  // =============================
  // 🎨 Render
  // =============================
  return (
    <div
      className={`w-full h-full flex flex-col gap-5 py-3 ${maxHeight ?? "h-full rounded-md"
        }`}
    >
      {/* 🔍 Search Input */}
      <div className="w-full relative mt-4">
        <Input
          type="text"
          placeholder={t("search-placeholder")}
          className="w-full pr-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute ltr:right-2 rtl:left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none" />
      </div>

      {/* 🏷️ Suggested Categories */}
      <div>
        <p className="text-base font-medium mb-2">{t("suggested-words")}</p>
        <div className="flex flex-wrap gap-2">
          {categories?.categories?.map(
            (category: any, index: number) => {
              const isActive = index === categoryIndex;
              return (
                <Badge
                  key={category.id ?? index}
                  className={`cursor-pointer border border-gray-200 rounded-md text-sm py-1 px-3 transition-colors duration-200 ${isActive
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                    }`}
                  onClick={() => {
                    setSearchCategory(category?.id ?? "");
                    setCategoryIndex(index);
                  }}
                >
                  {String(category?.name ?? "")}
                </Badge>
              );
            }
          )}
        </div>
      </div>

      {/* ❌ Clear Filters */}
      {(searchCategory || search) && (
        <button
          onClick={handleClearFilters}
          className="flex items-center gap-2 w-fit bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
        >
          {t("clear-filters")}
          <IoClose className="text-lg font-bold" />
        </button>
      )}

      {/* 🛍️ Products Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto">
        {filteredProducts?.length > 0 ? (
          filteredProducts.slice(0, 4).map((product: any, index: number) => (
            <ProductCard
              key={product?.id ?? index}
              product={product}
              cardColSpan="col-span-1 relative search-card"
            />
          ))
        ) : (
          <p className="col-span-1 sm:col-span-2 lg:col-span-4 text-center text-gray-500 mt-8">
            {t("no-results-found")}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
