"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ColorVariant, SizeVariant } from "@/types/types";

interface VariantSelectorProps {
  colorVariants: ColorVariant[];
  availableSizesForSelectedColor: SizeVariant[];
  selectedColor: number | null;
  selectedSize: number | null;
  onColorChange: (color: number) => void;
  onSizeChange: (size: number) => void;
  className?: string;
}

export default function VariantSelector({
  colorVariants,
  availableSizesForSelectedColor,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  className,
}: VariantSelectorProps) {
  const t = useTranslations("product-details");
  const hasColorVariants = colorVariants.length > 0;
  const hasSizeVariants = availableSizesForSelectedColor.length > 0;

  if (!hasColorVariants && !hasSizeVariants) {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Color Variants */}
      {hasColorVariants && (
        <div>
          <div className="flex gap-3">
            {colorVariants.map((colorVariant) => {
              const isActive = selectedColor === colorVariant.color;
              const isDisabled = !colorVariant.in_stock;

              return (
                <button
                  key={colorVariant.color}
                  onClick={() => !isDisabled && onColorChange(colorVariant.color)}
                  disabled={isDisabled}
                  className={cn(
                    "relative w-[50px] h-[50px] rounded-full border-2 transition-all duration-300 overflow-hidden",
                    "focus:outline-none focus:ring-2 focus:ring-[#D07A51] focus:ring-offset-2",
                    isActive
                      ? "border-black ring-2 ring-black/20 scale-110"
                      : "border-gray-300 hover:border-gray-400 hover:scale-105",
                    isDisabled && "opacity-50 cursor-not-allowed hover:scale-100"
                  )}
                  title={`${colorVariant.color_label}${isDisabled ? ` - ${t("out-of-stock")}` : ''}`}
                >
                  {/* Color variant image */}
                  <Image
                    src={colorVariant.base_image.medium_image_url || colorVariant.base_image.original_image_url}
                    alt={`${colorVariant.color_label} variant`}
                    fill
                    className="object-cover object-center"
                    sizes="50px"
                    suppressHydrationWarning
                  />
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-black/10" />
                  )}
                  
                  {/* Out of stock indicator */}
                  {isDisabled && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

             {/* Size Variants - Only show for selected color */}
      {hasSizeVariants && (
         <div>
           <div className="flex gap-2 flex-wrap">
             {availableSizesForSelectedColor.map((sizeVariant) => {
              const isActive = selectedSize === sizeVariant.size;
              const isDisabled = !sizeVariant.in_stock;

              return (
                <button
                  key={sizeVariant.size}
                  onClick={() => !isDisabled && onSizeChange(sizeVariant.size)}
                  disabled={isDisabled}
                  className={cn(
                    "w-[45px] h-[45px] rounded border-2 transition-all duration-300 text-sm font-medium",
                    "focus:outline-none focus:ring-2 focus:ring-[#D07A51] focus:ring-offset-2",
                    isActive
                      ? "border-black bg-black text-white scale-105"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
                    isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
                  )}
                  title={`${sizeVariant.size_label}${isDisabled ? ` - ${t("out-of-stock")}` : ''}`}
                >
                  {sizeVariant.size_label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
