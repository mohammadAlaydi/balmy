"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { AppDispatch, RootState } from "@/store/store";
import { getSearchProducts } from "@/store/slices/search-products-slice";
import { usePathname } from "next/navigation";

/**
 * Custom hook to handle product search and filtering by category.
 */
export default function useSearch() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
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
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  // =============================
  // 🚀 Fetch Products (on mount)
  // =============================
  useEffect(() => {
    dispatch(getSearchProducts({ locale: currentLocale }) as any);
  }, [dispatch]);

  // =============================
  // 🧠 Filter Products
  // =============================

  useEffect(() => {
    if (!products?.data) {
      setFilteredProducts([]);
      return;
    }

    const normalizedSearch = search.trim().toLowerCase();

    setFilteredProducts(
      products?.data?.filter((product: any) => {
        const name = String(product?.name || "").toLowerCase();
        const sku = String(product?.sku || "").toLowerCase();
        const price = String(product?.price || "");
    
        const matchesText =
          !normalizedSearch ||
          name.includes(normalizedSearch) ||
          sku.includes(normalizedSearch) ||
          price.includes(normalizedSearch);
    
        const matchesCategory =
          !searchCategory ||
          (Array.isArray(product?.category_id) &&
            product.category_id.includes(searchCategory));
    
        return matchesText && matchesCategory;
      })
    );
    
  }, [products, search, categoryIndex, searchCategory]);
  
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
