"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/types/types";

interface SingleProductImageHolderProps {
  baseImage: ProductImage;
  hoverImage: ProductImage;
  galleryImages: ProductImage[];
  productName: string;
  className?: string;
}

export default function SingleProductImageHolder({
  baseImage,
  hoverImage,
  galleryImages,
  productName,
  className,
}: SingleProductImageHolderProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
    null
  );

  // Combine all images: base, hover, and gallery
  const allImages = [
    { ...baseImage, type: "base" },
    { ...hoverImage, type: "hover" },
    ...galleryImages.map((img, index) => ({
      ...img,
      type: `gallery-${index}`,
    })),
  ].filter(
    (img, index) =>
      index === 0 || img.original_image_url !== baseImage.original_image_url
  );

  // Use hovered image if available, otherwise use selected image
  const displayImageIndex =
    hoveredImageIndex !== null ? hoveredImageIndex : selectedImageIndex;
  const currentImage = allImages[displayImageIndex] || baseImage;
  const fallbackImage = "/assets/images/product-card.jpg";

  return (
    <div className={cn("flex gap-5 w-full col-span-12", className)}>
      {/* Main Image Display */}
      <div className="relative w-full lg:w-[calc(100%-100px)] aspect-square overflow-hidden rounded-lg bg-gray-50 grid grid-cols-12">
        <Image
          src={
            currentImage.large_image_url ||
            currentImage.original_image_url ||
            fallbackImage
          }
          alt={`${productName} - Main view`}
          fill
          className="object-cover object-center transition-all duration-300 hover:scale-105 col-span-12"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          suppressHydrationWarning
        />

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {displayImageIndex + 1} / {allImages.length}
        </div>

        {/* New/Featured Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {/* Add badges here if needed */}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="w-[100px] flex flex-col items-center gap-2  lg:max-h-[500px]">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              onMouseEnter={() => setHoveredImageIndex(index)}
              onMouseLeave={() => setHoveredImageIndex(null)}
              className={cn(
                "relative w-[80px] h-[80px] lg:w-[80px] lg:h-[80px] flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 hover:scale-105",
                selectedImageIndex === index
                  ? "border-red-500 ring-2 ring-red-500/20"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <Image
                src={
                  image.medium_image_url ||
                  image.original_image_url ||
                  fallbackImage
                }
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover object-center"
                sizes="80px"
                suppressHydrationWarning
              />
              {selectedImageIndex === index && (
                <div className="absolute inset-0 bg-red-500/10" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
