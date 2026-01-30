"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface ProductImage {
    original_image_url: string;
    medium_image_url?: string;
    small_image_url?: string;
    large_image_url?: string;
    url?: string;
}

interface ProductImageGalleryBalmyProps {
    baseImage: ProductImage;
    hoverImage?: ProductImage;
    galleryImages?: ProductImage[];
    productName: string;
    className?: string;
    showQuickBuyBadge?: boolean;
}

export default function ProductImageGalleryBalmy({
    baseImage,
    hoverImage,
    galleryImages = [],
    productName,
    className,
    showQuickBuyBadge = true,
}: ProductImageGalleryBalmyProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const t = useTranslations("product-details");

    // Combine all images into one array
    const allImages: ProductImage[] = [
        baseImage,
        ...(hoverImage && hoverImage.original_image_url !== baseImage.original_image_url
            ? [hoverImage]
            : []),
        ...galleryImages.filter(
            (img) => img.original_image_url !== baseImage.original_image_url
        ),
    ];

    const currentImage = allImages[selectedImageIndex] || baseImage;
    const fallbackImage = "/assets/images/product-card.jpg";

    const getImageUrl = (image: ProductImage): string => {
        return image.large_image_url || image.original_image_url || image.url || fallbackImage;
    };

    const getThumbnailUrl = (image: ProductImage): string => {
        return image.medium_image_url || image.small_image_url || image.original_image_url || image.url || fallbackImage;
    };

    return (
        <div className={cn("flex flex-col gap-4 w-full", className)} dir="rtl">
            {/* Main Image Container */}
            <div className="relative w-full aspect-square overflow-hidden bg-[var(--color-light-gray)] rounded-lg">
                <Image
                    src={getImageUrl(currentImage)}
                    alt={productName}
                    fill
                    className="object-cover object-center transition-all duration-300"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />

                {/* Quick Buy Badge - Top Left */}
                {showQuickBuyBadge && (
                    <Badge className="absolute top-4 left-4 bg-[var(--color-red-4)] text-white font-semibold px-3 py-1.5 text-sm shadow-md rounded-md z-10">
                        {t("buy-quickly") || "اشتر سريعاً"}
                    </Badge>
                )}
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 justify-start overflow-x-auto pb-2">
                {allImages.slice(0, 4).map((image, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={cn(
                            "relative w-[70px] h-[70px] md:w-[80px] md:h-[80px] flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-md",
                            selectedImageIndex === idx
                                ? "border-[var(--color-black)] ring-2 ring-black/20 shadow-md"
                                : "border-[var(--color-light-gray-3)] hover:border-[var(--color-medium-gray)]"
                        )}
                    >
                        <Image
                            src={getThumbnailUrl(image)}
                            alt={`${productName} - ${idx + 1}`}
                            fill
                            className="object-cover object-center"
                            sizes="80px"
                        />
                        {selectedImageIndex === idx && (
                            <div className="absolute inset-0 bg-black/5" />
                        )}
                    </button>
                ))}

                {/* Empty placeholder thumbnails if less than 4 images */}
                {Array.from({ length: Math.max(0, 4 - allImages.length) }).map((_, idx) => (
                    <div
                        key={`placeholder-${idx}`}
                        className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] flex-shrink-0 rounded-lg border-2 border-dashed border-[var(--color-light-gray-3)] bg-[var(--color-light-gray)]/30"
                    />
                ))}
            </div>
        </div>
    );
}
