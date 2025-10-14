"use client";

import React from "react";
import { cn } from "@/lib/utils";
import SingleProductImageHolder from "./single-product-image-holder";
import SingleProductDescription from "./single-product-description";
import SingleProductReviews from "./single-product-reviews";
import { ProductDetailsApiResponse } from "@/types/types";
import SingleProductDetails from "./single-product-details";
import { useProductVariants } from "@/hooks/use-product-variants";

interface SingleProductCardProps {
  product: ProductDetailsApiResponse["data"];
  className?: string;
}

export default function SingleProductCard({
  product,
  className,
}: SingleProductCardProps) {
  const variantProps = useProductVariants({ product });
  const {
    hasVariants,
    colorVariants,
    availableSizesForSelectedColor,
    currentVariant,
    selectedVariants,
    handleColorChange,
    handleSizeChange,
  } = variantProps;

  const baseImage = currentVariant?.base_image || product.base_image;
  const hoverImage = currentVariant?.hovered_image || product.hovered_image;
  const galleryImages =
    currentVariant?.gallary && currentVariant.gallary.length > 0
      ? currentVariant.gallary
      : product.gallary;

  return (
    <div className={cn("w-full", className)}>
      {/* Main Product Section */}
      <div className="w-full">
        {/* Product Image and Details Row */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          {/* Image Holder - 65% width on desktop, 100% on mobile */}
          <div className="w-full order-1 lg:order-1 md:w-[48%] grid grid-cols-12">
            <SingleProductImageHolder
              baseImage={baseImage}
              hoverImage={hoverImage}
              galleryImages={galleryImages}
              productName={product.name}
            />
          </div>

          {/* Product Details - 35% width on desktop, 100% on mobile */}
          <div className="w-full order-2 lg:order-2 md:w-[48%]">
            <SingleProductDetails
              product={product}
              variantProps={variantProps}
            />
          </div>
        </div>
      </div>

      {/* Full Width Sections */}
      <div className="w-full  mx-auto">
        {/* Product Description */}
        <SingleProductDescription
          description={product.description ?? ""}
          shortDescription={product.short_description ?? ""}
          productName={product.name}
        />

        {/* Product Reviews */}
        <SingleProductReviews
          reviews={product.reviews}
          productId={product.id}
          productName={product.name}
        />
      </div>
    </div>
  );
}
