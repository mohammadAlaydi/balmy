import { notFound } from "next/navigation";
import { Metadata } from "next";

import ProductPageStatus from "@/features/product/product-page-status";
import PageWrapper from "@/components/page-wrapper";

interface ProductDetailsPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/product-details/${params.id}`,
      { method: "GET", credentials: "include" }
    );

    if (!res.ok) throw new Error("Product not found");

    const product = await res.json();

    return {
      title: `${product?.data?.name} | My Store`,
      description:
        product?.data?.description || "Check out this amazing product!",
      openGraph: {
        title: product?.data?.name,
        description:
          product?.data?.description || "Check out this amazing product!",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/product/${params.id}`,
        images: [
          {
            url:
              product?.data?.base_image?.original_image_url ||
              "/assets/images/no-image.webp",
            width: 1200,
            height: 630,
            alt: product?.data?.name,
          },
        ],
        siteName: "My Store",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product?.data?.name,
        description:
          product?.data?.description || "Check out this amazing product!",
        images: [
          product?.data?.base_image?.original_image_url ||
            "/assets/images/no-image.webp",
        ],
      },
    };
  } catch {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
      openGraph: {
        title: "Product not found",
        description: "The requested product could not be found.",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/product/${params.id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Product not found",
        description: "The requested product could not be found.",
      },
    };
  }
}

export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const productId = parseInt(params.id);
  if (isNaN(productId)) notFound();

  return (
    <PageWrapper>
      <ProductPageStatus productId={productId} />
    </PageWrapper>
  );
}
