"use client";

import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { getCategoryProducts } from "@/store/slices/category-products-slice";
import type { AppDispatch, RootState } from "@/store/store";

export default function useCategory() {
    
  const { id } = useParams<{ id: string }>(); 
  const t = useTranslations("category");
  const dispatch = useDispatch<AppDispatch>();

  const { products: categoryProducts, loading, error } = useSelector(
    (state: RootState) => state.categoryProducts
  );

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  // ✅ Fetch category products when ID changes
  useEffect(() => {
    if (id) {
      dispatch(getCategoryProducts({ id }));
    }
  }, [dispatch, id]);

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
