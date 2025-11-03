// import React from "react";
// import { notFound } from "next/navigation";
// import ProductDetailsClient from "./product-details-client";

// interface ProductDetailsPageProps {
//   params: Promise<{
//     id: string;
//     locale: string;
//   }>;
// }

// export default async function ProductDetailsPage({
//   params,
// }: ProductDetailsPageProps) {
//   const resolvedParams = await params;
//   const productId = parseInt(resolvedParams.id);

//   if (isNaN(productId)) {
//     notFound();
//   }

//   return <ProductDetailsClient productId={productId} />;
// }
import React from "react";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./product-details-client";

/**
 * ✅ Types
 */
interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

/**
 * ✅ Fetch all products (for static generation)
 * You can adjust the API path to your backend
 */
async function getAllProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 300 }, // Revalidate every 5 minutes (ISR)
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json?.data || [];
}

/**
 * ✅ Fetch single product details
 */
async function getProductDetails(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data;
}

/**
 * ✅ Pre-generate all product pages for SEO
 * (Static generation with multilingual support)
 */
export async function generateStaticParams() {
  const locales = ["en", "ar"]; // add all supported locales
  const products = await getAllProducts();

  const params = [];

  for (const locale of locales) {
    for (const product of products) {
      if (product?.id) {
        params.push({
          locale,
          id: product.id.toString(),
        });
      }
    }
  }

  return params;
}

/**
 * ✅ Dynamic SEO metadata
 */
export async function generateMetadata({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const product = await getProductDetails(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "This product could not be found.",
    };
  }

  return {
    title: `${product.name} | My Store`,
    description:
      product.description?.slice(0, 150) || "Product details and specifications.",
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url:
            product?.base_image?.original_image_url ||
            "/assets/images/no-image.webp",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

/**
 * ✅ Server Component Page
 */
export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  if (isNaN(productId)) {
    notFound();
  }

  return <ProductDetailsClient productId={productId} />;
}
