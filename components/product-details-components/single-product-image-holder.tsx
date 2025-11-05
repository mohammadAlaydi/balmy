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
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);

  const allImages = [
    { ...baseImage, type: "base" },
    { ...hoverImage, type: "hover" },
    ...galleryImages.map((img, idx) => ({ ...img, type: `gallery-${idx}` })),
  ].filter((img, idx) => idx === 0 || img.original_image_url !== baseImage.original_image_url);

  const displayIndex = hoveredImageIndex ?? selectedImageIndex;
  const currentImage = allImages[displayIndex] || baseImage;
  const fallbackImage = "/assets/images/product-card.jpg";

  return (
    <div className={cn("flex gap-5 w-full col-span-12", className)}>
      <div className="relative w-full lg:w-[calc(100%-100px)] aspect-square overflow-hidden rounded-lg bg-gray-50 grid grid-cols-12">
        <Image
          src={currentImage.large_image_url ?? currentImage.original_image_url ?? fallbackImage}
          alt={`${productName} - Main view`}
          fill
          className="object-cover object-center transition-all duration-300 hover:scale-105 col-span-12"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          suppressHydrationWarning
        />
        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {displayIndex + 1} / {allImages.length}
        </div>
      </div>

      {allImages.length > 1 && (
        <div className="w-[100px] flex flex-col items-center gap-2 lg:max-h-[500px]">
          {allImages.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              onMouseEnter={() => setHoveredImageIndex(idx)}
              onMouseLeave={() => setHoveredImageIndex(null)}
              className={cn(
                "relative w-[80px] h-[80px] flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 hover:scale-105",
                selectedImageIndex === idx
                  ? "border-red-500 ring-2 ring-red-500/20"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <Image
                src={image.medium_image_url ?? image.original_image_url ?? fallbackImage}
                alt={`${productName} - Thumbnail ${idx + 1}`}
                fill
                className="object-cover object-center"
                sizes="80px"
                suppressHydrationWarning
              />
              {selectedImageIndex === idx && <div className="absolute inset-0 bg-red-500/10" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
