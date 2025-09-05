"use client";

import { useFetcher } from "@/app/helpers/fetchers";
import Loading from "@/components/loading";
import PagePadding from "@/components/page-padding";
import ProductCard from "@/components/product-card";
import { getCategoryProducts } from "@/store/slices/category-products-slice";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = use(params);
  const [categorySlug, categoryId] = slug;
  const categoryProducts = useSelector((state: any) => state.categoryProducts)
  const isLoading = useSelector((state: any) => state.categoryProducts.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryProducts({ categoryId }))
    }
  }, [dispatch, categoryId]);


  if (isLoading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  return (
    <PagePadding containerClassName="grid grid-cols-12 gap-2 md:gap-3 xl:gap-5 flex-wrap min-h-[65vh]">
      {categoryProducts?.products?.data?.map((product: any, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </PagePadding>
  );
}
