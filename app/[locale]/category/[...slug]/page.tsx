"use client";

import Loading from "@/components/loading";
import ProductCard from "@/components/product-card";
import CategoryFilter from "@/components/category-filter";
import { getCategoryProducts } from "@/store/slices/category-products-slice";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import PageWrapper from "@/components/page-wrapper";

export default function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  
  const t = useTranslations("category");
  const { slug } = use(params);
  const [categorySlug, categoryId] = slug;
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const {
    products: categoryProducts,
    loading,
    error,
  } = useSelector((state: any) => state.categoryProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryProducts({ categoryId }) as any);
    }
  }, [dispatch, categoryId, categorySlug]);

  // Update filtered products when products change
  useEffect(() => {
    const products = categoryProducts?.data || [];
    setFilteredProducts(products);
  }, [categoryProducts, categorySlug, categoryId]);

  if (loading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-full w-full min-h-[65vh]">
          <p className="text-base md:text-lg xl:text-xl text-center text-red-600">
            {t("error-loading-products") ||
              "Error loading products. Please try again."}
          </p>
        </div>
      </PageWrapper>
    );
  }

  const products = categoryProducts?.products?.data || [];

  return (
    <PageWrapper>
      <div className="flex items-center gap-5 justify-start my-5">
        {products.length > 0 && (
          <CategoryFilter
            products={products}
            onFilterChange={setFilteredProducts}
          />
        )}
        {products.length > 0 && (
          <p className="text-gray-600 text-nowrap">
            {t("products-count", { count: filteredProducts.length })}
          </p>
        )}
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-12 gap-2 md:gap-3 xl:gap-5 flex-wrap min-h-[65vh]">
          {filteredProducts.map((product: any, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="flex items-center justify-center h-full w-full min-h-[65vh]">
          <p className="text-base md:text-lg xl:text-xl text-center text-gray-600">
            {t("no-products-match-filters")}
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full min-h-[65vh]">
          <p className="text-base md:text-lg xl:text-xl text-center text-gray-600">
            {t("no-products-found")}
          </p>
        </div>
      )}
    </PageWrapper>
  );
}
