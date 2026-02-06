"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/ProductCard";
import useHome from "@/hooks/use-home";
import { BeatLoader } from "react-spinners";

interface RelatedProductsSectionProps {
    categoryIds?: number[];
    currentProductId: number;
    categoryName?: string; // Optional: category name to match products from same section
    className?: string;
}

export default function RelatedProductsSection({
    categoryIds = [],
    currentProductId,
    categoryName,
    className,
}: RelatedProductsSectionProps) {
    const t = useTranslations("product-details");
    const { data, loading } = useHome();

    // Extract homeSections from data (same pattern as home page)
    const homeSections = data?._raw?.homeSections || data?.homeSections || [];

    // Get related products from the same category section
    const relatedProducts = useMemo(() => {
        if (!homeSections || homeSections.length === 0) return [];

        // Find products from category sections
        let allProducts: any[] = [];

        // Strategy 1: If categoryName is provided, find that specific section
        if (categoryName) {
            const matchingSection = homeSections.find(
                (section: any) =>
                    section.type === 'category' &&
                    (section.data?.categoryName === categoryName || section.label === categoryName)
            );
            if (matchingSection?.data?.productList) {
                allProducts = matchingSection.data.productList;
            }
        }

        // Strategy 2: Collect products from all category sections if no categoryName match
        if (allProducts.length === 0) {
            homeSections.forEach((section: any) => {
                if (section.type === 'category' && section.data?.productList && Array.isArray(section.data.productList)) {
                    allProducts = [...allProducts, ...section.data.productList];
                }
            });
        }

        // Filter out the current product and limit to 4
        return allProducts
            .filter((p: any) => {
                const productId = p.entityId || p.product_id || p.id;
                return productId !== currentProductId;
            })
            .slice(0, 4);
    }, [homeSections, currentProductId, categoryName]);

    if (loading) {
        return (
            <div className={cn("py-8 flex justify-center", className)} dir="rtl">
                <BeatLoader color="var(--color-primary)" size={12} />
            </div>
        );
    }

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
                {relatedProducts.map((product: any, index: number) => (
                    <ProductCard
                        key={product.entityId || product.product_id || product.id || index}
                        product={product}
                        cardColSpan="col-span-1"
                    />
                ))}
            </div>
        </div>
    );
}
