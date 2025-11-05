"use client";

import React from "react";
import { useTranslations } from "next-intl";
import SingleProductCard from "@/components/product-details-components/single-product-card";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useGetProductDetailsQuery } from "@/store/slices/products-slice";
import Loading from "@/components/loading";
import PageWrapper from "@/components/page-wrapper";

interface ProductDetailsClientProps {
  productId: number;
}

export default function ProductDetailsClient({
  productId,
}: ProductDetailsClientProps) {
  const t = useTranslations("product-details");
  const { data, isLoading, error, refetch } =
    useGetProductDetailsQuery(productId);

  if (isLoading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error ? t("error-loading-product") : t("product-not-found")}
          </h1>
          <p className="text-gray-600 mb-4">
            {error ? t("please-try-again") : t("product-not-available")}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            {t("retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      <ErrorBoundary>
        <SingleProductCard product={data.data} />
      </ErrorBoundary>
    </PageWrapper>
  );
}
