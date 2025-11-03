// Server Component: ProductDetailsPage.tsx
import React from "react";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./product-details-client";
import type { Metadata } from "next";
import { getProductDetails } from "@/store/slices/product-details-slice";

interface ProductDetailsPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product-details/${params.id}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Product not found');
    }

    const product = await res.json();

    return {
      title: `${product.name} | My Store`,
      description: product.description || 'Check out this amazing product!',
      openGraph: {
        title: product.name,
        description: product.description || 'Check out this amazing product!',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/product/${params.id}`,
        images: [
          {
            url: product.base_image?.original_image_url || '/assets/images/no-image.webp',
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        siteName: 'My Store',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description || 'Check out this amazing product!',
        images: [product.base_image?.original_image_url || '/assets/images/no-image.webp'],
      },
    };
  } catch (error) {
    return {
      title: 'Product not found',
      description: 'The requested product could not be found.',
      openGraph: {
        title: 'Product not found',
        description: 'The requested product could not be found.',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/product/${params.id}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Product not found',
        description: 'The requested product could not be found.',
      },
    };
  }
}


export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const productId = parseInt(params.id);

  if (isNaN(productId)) notFound();

  // Optional: check if product exists server-side for 404
  const product = await getProductDetails(params.id);

  if (!product) notFound();

  // ✅ Pass only productId to client component
  return <ProductDetailsClient productId={productId} />;
}
