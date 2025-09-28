"use client";

import Loading from "@/components/loading";
import PagePadding from "@/components/page-padding";
import ProductCard from "@/components/product-card";
import { getCategoryProducts } from "@/store/slices/category-products-slice";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const t = useTranslations("category");
  const { slug } = use(params);
  const [categorySlug, categoryId] = slug;
  const categoryProducts = useSelector((state: any) => state.categoryProducts)
  const isLoading = useSelector((state: any) => state.categoryProducts.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryProducts({ categoryId }) as any)
    }
  }, [dispatch, categoryId]);


  if (isLoading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  const products = categoryProducts?.products?.data || [];

  return (
    <PagePadding>
      <div className="mb-6">
        {products.length > 0 && (
          <p className="text-center text-gray-600">
            {t("products-count", { count: products.length })}
          </p>
        )}
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-12 gap-2 md:gap-3 xl:gap-5 flex-wrap min-h-[65vh]">
          {products.map((product: any, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full min-h-[65vh]">
          <p className="text-base md:text-lg xl:text-xl text-center text-gray-600">
            {t("no-products-found")}
          </p>
        </div>
      )}
    </PagePadding>
  );
}
