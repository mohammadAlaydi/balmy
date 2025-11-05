"use client";

import React from "react";
import SingleProductImageHolder from "./single-product-image-holder";
import SingleProductDescription from "./single-product-description";
import SingleProductReviews from "./single-product-reviews";
import SingleProductInfo from "./single-product-info";
import { ProductDetailsApiResponse } from "@/types/types";
import { useProductVariants } from "@/hooks/use-product-variants";

interface SingleProductDetailsProps {
  product: ProductDetailsApiResponse["data"];
}

export default function SingleProductDetails({ product }: SingleProductDetailsProps) {
  
  const variantProps = useProductVariants({ product });
  const {
    currentVariant,
  } = variantProps;

  const baseImage = currentVariant?.base_image || product.base_image;
  const hoverImage = currentVariant?.hovered_image || product.hovered_image;
  const galleryImages =
    currentVariant?.gallary?.length ? currentVariant.gallary : product.gallary;

  return (
    <>
      <div className="flex flex-col xl:flex-row justify-between gap-8 mb-12">
        <div className="w-full xl:w-[48%] grid grid-cols-12">
          <SingleProductImageHolder
            baseImage={baseImage}
            hoverImage={hoverImage}
            galleryImages={galleryImages}
            productName={product.name}
          />
        </div>

        <div className="w-full xl:w-[48%]">
          <SingleProductInfo
            product={product}
            variantProps={variantProps}
          />
        </div>
      </div>

      <SingleProductDescription
        description={product.description ?? ""}
        shortDescription={product.short_description ?? ""}
        productName={product.name}
      />

      <SingleProductReviews
        reviews={product.reviews}
        productId={product.id}
        productName={product.name}
      />
    </>
  );
}
