"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface SizeSelectorBalmyProps {
    sizes: Array<{
        value: string;
        label: string;
        inStock?: boolean;
    }>;
    selectedSize: string | null;
    onSizeChange: (size: string) => void;
    className?: string;
}

export default function SizeSelectorBalmy({
    sizes,
    selectedSize,
    onSizeChange,
    className,
}: SizeSelectorBalmyProps) {
    const t = useTranslations("product-details");

    if (!sizes || sizes.length === 0) {
        return null;
    }

    return (
        <div className={cn("flex flex-col gap-3", className)} dir="rtl">
            <h3 className="text-base font-semibold text-[var(--color-black)] font-cairo">
                {t("select-size") || "اختر الحجم"}
            </h3>

            <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                    const isSelected = selectedSize === size.value;
                    const isDisabled = size.inStock === false;

                    return (
                        <button
                            key={size.value}
                            onClick={() => !isDisabled && onSizeChange(size.value)}
                            disabled={isDisabled}
                            className={cn(
                                "px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 min-w-[70px] font-cairo",
                                isSelected
                                    ? "bg-[#333333] text-white border-[#333333]"
                                    : "bg-[#F5F5F5] text-[#666666] border-[#E0E0E0] hover:border-[#999999]",
                                isDisabled && "opacity-40 cursor-not-allowed line-through"
                            )}
                        >
                            {size.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
