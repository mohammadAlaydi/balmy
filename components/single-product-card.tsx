"use client";

import React from "react";
import { cn } from "@/lib/utils";
import SingleProductImageHolder from "./single-product-image-holder";
import SingleProductDescription from "./single-product-description";
import SingleProductReviews from "./single-product-reviews";
import { ProductDetailsApiResponse } from "@/types/types";
import SingleProductDetails from "./single-product-details";

interface SingleProductCardProps {
  product: ProductDetailsApiResponse["data"];
  className?: string;
}

export default function SingleProductCard({ product, className }: SingleProductCardProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Main Product Section */}
      <div className="w-full lg:w-[70%] mx-auto">
        {/* Product Image and Details Row */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Image Holder - 65% width on desktop, 100% on mobile */}
          <div className="w-full lg:w-[65%] order-1 lg:order-1">
            <SingleProductImageHolder 
              baseImage={product.base_image}
              hoverImage={product.hovered_image}
              galleryImages={product.gallary}
              productName={product.name}
            />
          </div>
          
          {/* Product Details - 35% width on desktop, 100% on mobile */}
          <div className="w-full lg:w-[35%] order-2 lg:order-2">
            <SingleProductDetails product={product} />
          </div>
        </div>
      </div>

      {/* Full Width Sections */}
      <div className="w-full lg:w-[70%] mx-auto">
        {/* Product Description */}
        <SingleProductDescription 
          description={product.description}
          shortDescription={product.short_description}
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
