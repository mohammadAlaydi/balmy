"use client";

import { useFetcher } from "@/app/helpers/fetchers";
import PagePadding from "@/components/page-padding";
import ProductCard from "@/components/product-card";
import { use, useEffect, useState } from "react";

interface CategoryData {
  id: string;
  name: string;
  description: string;
  products: any[];
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>; // 👈 params بقت Promise
}) {
  // 👇 نفك الـ Promise باستخدام React.use()
  const { slug } = use(params);
  const [categorySlug, categoryId] = slug;
  const [token, setToken] = useState<string | null>(null);
  console.log(slug);

  const API_KEY = process.env.NEXT_PUBLIC_API_URL;

  // Get token from localStorage after component mounts (client-side only)
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

  if (loading) {
    return (
      <PagePadding>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading category...</div>
        </div>
      </PagePadding>
    );
  }

  if (error) {
    return (
      <PagePadding>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg text-red-600">
            Error loading category: {error.message}
          </div>
        </div>
      </PagePadding>
    );
  }

  if (!categoryData?.data) {
    return (
      <PagePadding>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">No category data found</div>
        </div>
      </PagePadding>
    );
  }

  return (
    <PagePadding containerClassName="grid grid-cols-12 gap-5 flex-wrap min-h-[65vh]">
      {categoryData?.data?.map((product: any, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </PagePadding>
  );
}
