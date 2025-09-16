import React from "react";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./product-details-client";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);
  
  if (isNaN(productId)) {
    notFound();
  }

  return <ProductDetailsClient productId={productId} />;
}
