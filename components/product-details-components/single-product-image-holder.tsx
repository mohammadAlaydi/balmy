"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/types/types";
import { Card } from "@/components/ui/card";

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
    <Card className={cn("flex gap-4 p-4 w-full col-span-12 shadow-sm hover:shadow-md transition-shadow duration-300 border-gray-200", className)}>
      <div className="relative w-full lg:w-[calc(100%-110px)] aspect-square overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={currentImage.large_image_url ?? currentImage.original_image_url ?? fallbackImage}
          alt={`${productName} - Main view`}
          fill
          className="object-cover object-center transition-all duration-300 hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          suppressHydrationWarning
        />
        <div className="absolute top-4 ltr:right-4 rtl:left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium">
          {displayIndex + 1} / {allImages.length}
        </div>
      </div>

      {allImages.length > 1 && (
        <div className="w-[90px] flex flex-col items-center gap-3 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {allImages.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              onMouseEnter={() => setHoveredImageIndex(idx)}
              onMouseLeave={() => setHoveredImageIndex(null)}
              className={cn(
                "relative w-[80px] h-[80px] flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-md",
                selectedImageIndex === idx
                  ? "border-black ring-2 ring-black/20 shadow-md"
                  : "border-gray-200 hover:border-gray-400"
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
              {selectedImageIndex === idx && <div className="absolute inset-0 bg-black/10" />}
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
