"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/dev-config";

interface RelatedProductsSectionProps {
    categoryIds?: number[];
    currentProductId: number;
    className?: string;
}

export default function RelatedProductsSection({
    categoryIds = [],
    currentProductId,
    className,
}: RelatedProductsSectionProps) {
    const t = useTranslations("product-details");

    // Get related products based on category (excluding current product)
    const relatedProducts = MOCK_PRODUCTS.data
        .filter((p) => {
            // Exclude current product
            if (p.id === currentProductId) return false;

            // If categoryIds provided, filter by those
            if (categoryIds.length > 0) {
                return p.category_id.some((catId) => categoryIds.includes(catId));
            }

            // Otherwise return all
            return true;
        })
        .slice(0, 4); // Limit to 4 products

    if (relatedProducts.length === 0) {
        return null;
    }

    return (
        <div className={cn("py-8", className)} dir="rtl">
            {/* Section Title */}
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-black)] font-cairo mb-6">
                {t("related-products") || "منتجات ذات صلة"}
            </h2>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product as any}
                        cardColSpan="col-span-1"
                    />
                ))}
            </div>
        </div>
    );
}
