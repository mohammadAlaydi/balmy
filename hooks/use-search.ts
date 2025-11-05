"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { AppDispatch, RootState } from "@/store/store";
import { getSearchProducts } from "@/store/slices/search-products-slice";

/**
 * Custom hook to handle product search and filtering by category.
 */
export default function useSearch() {
  const t = useTranslations("search");
  const dispatch = useDispatch<AppDispatch>();

  // =============================
  // 🧭 Redux State
  // =============================
  const { products, isLoading } = useSelector(
    (state: RootState) => state.searchProducts
  );
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );

  // =============================
  // 🔍 Local State
  // =============================
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [categoryIndex, setCategoryIndex] = useState<number | null>(null);

  // =============================
  // 🚀 Fetch Products (on mount)
  // =============================
  useEffect(() => {
    dispatch(getSearchProducts() as any);
  }, [dispatch]);

  // =============================
  // 🧠 Filter Products
  // =============================
  const filteredProducts = useMemo(() => {
    if (!products?.data) return [];

    const normalizedSearch = search.trim().toLowerCase();
    const hasSearch = normalizedSearch.length > 0;

    return products.data.filter((product: any) => {
      const matchesCategory = searchCategory
        ? Array.isArray(product?.category_id)
          ? product.category_id.includes(searchCategory)
          : product?.category_id === searchCategory
        : true;

      if (!hasSearch) return matchesCategory;

      const name = (product?.name || "").toLowerCase();
      const sku = String(product?.sku || "").toLowerCase();

      const matchesText =
        name.includes(normalizedSearch) || sku === normalizedSearch;

      return matchesText && matchesCategory;
    });
  }, [products, search, searchCategory]);

  // =============================
  // 🧭 Return Hook API
  // =============================
  return {
    t,
    isLoading,
    loading,
    categories,
    search,
    setSearch,
    searchCategory,
    setSearchCategory,
    categoryIndex,
    setCategoryIndex,
    filteredProducts,
  };
}
