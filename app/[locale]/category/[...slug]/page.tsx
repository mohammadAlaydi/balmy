"use client";

import { useFetcher } from "@/app/helpers/fetchers";
import Loading from "@/components/loading";
import PagePadding from "@/components/page-padding";
import ProductCard from "@/components/product-card";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const API_KEY = process.env.NEXT_PUBLIC_API_URL;
  const { slug } = use(params);
  const [categorySlug, categoryId] = slug;
  const [token, setToken] = useState<string | null>(null);
  const isLoading = useSelector((state: any) => state.productDetails.isLoading);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const {
    data: categoryData,
    loading,
    error,
  } = useFetcher(
    token ? `${API_KEY}/v1/category-products/${categoryId}` : null,
    {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  // if (isLoading) {
  //   return <Loading fullScreen={true} variant="spinner" size="xl" />;
  // }

  return (
    <PagePadding containerClassName="grid grid-cols-12 gap-2 md:gap-3 xl:gap-5 flex-wrap min-h-[65vh]">
      {categoryData?.data?.map((product: any, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </PagePadding>
  );
}
