"use client";

import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { getCategoryProducts } from "@/store/slices/category-products-slice";
import type { AppDispatch, RootState } from "@/store/store";

/**
 * Hook for fetching category products
 * @param categoryId - Optional category ID. If not provided, uses URL params.
 */
export default function useCategory(categoryId?: string | number) {
    
  const params = useParams<{ id: string; locale: string }>();
  // Use provided categoryId or fall back to URL params
  const id = categoryId?.toString() || params?.id;
  const locale = params?.locale || 'ar';
  
  const t = useTranslations("category");
  const dispatch = useDispatch<AppDispatch>();

  const { products: categoryProducts, loading, error } = useSelector(
    (state: RootState) => state.categoryProducts
  );

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  // ✅ Fetch category products when ID changes
  useEffect(() => {
    if (id) {
      dispatch(getCategoryProducts({ id, locale }));
    }
  }, [dispatch, id, locale]);

  // ✅ Sync filtered products when data updates
  useEffect(() => {
    setFilteredProducts(categoryProducts?.data || []);
  }, [categoryProducts]);

  // ✅ Stable filter callback
  const handleFilterChange = useCallback((filtered: any[]) => {
    setFilteredProducts(filtered);
  }, []);

  return {
    loading,
    error,
    t,
    categoryProducts,
    filteredProducts,
    handleFilterChange,
  };
}
