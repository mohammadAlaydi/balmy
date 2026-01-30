"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import ProductImageGalleryBalmy from "@/components/balmy/product-image-gallery-balmy";
import ProductInfoBalmy from "@/components/balmy/product-info-balmy";
import ReviewsSectionBalmy from "@/components/balmy/reviews-section-balmy";
import RelatedProductsSection from "@/components/product-details-components/related-products-section";
import BreadcrumbBalmy from "@/components/balmy/breadcrumb-balmy";
import PageWrapper from "@/components/page-wrapper";

interface ProductImage {
    original_image_url: string;
    medium_image_url?: string;
    small_image_url?: string;
    large_image_url?: string;
    url?: string;
}

interface ProductDetailsBalmyProps {
    product: {
        id: number;
        product_id?: number;
        name: string;
        sku?: string;
        price?: string | number;
        special_price?: string | number | null;
        in_stock?: boolean;
        new?: boolean;
        featured?: boolean;
        description?: string | null;
        short_description?: string | null;
        reviews?: number | {
            total: number;
            total_rating?: number;
            average_rating?: number | null;
        };
        brand?: string;
        variants?: any[];
        base_image?: ProductImage;
        hovered_image?: ProductImage;
        gallary?: ProductImage[];
        images?: string[] | Array<{ url?: string; original_image_url?: string }>;
        category_id?: number[];
    };
    className?: string;
}

export default function ProductDetailsBalmy({
    product,
    className,
}: ProductDetailsBalmyProps) {
    const t = useTranslations("product-details");

    // Helper function to get image URL from various formats
    const getImageUrl = (img: string | { url?: string; original_image_url?: string }): string => {
        if (typeof img === 'string') return img;
        return img.url || img.original_image_url || "/abood.jpg";
    };

    // Prepare images
    const firstImage = product.images?.[0];
    const baseImage: ProductImage = product.base_image || {
        original_image_url: firstImage ? getImageUrl(firstImage) : "/abood.jpg",
    };

    const hoverImage: ProductImage | undefined = product.hovered_image;

    const galleryImages: ProductImage[] = product.gallary ||
        product.images?.map(img => ({
            original_image_url: getImageUrl(img),
        })) || [];

    // Normalize reviews data - handle both number and object formats
    const reviews = typeof product.reviews === 'number'
        ? { total: product.reviews, total_rating: 0, average_rating: 4.0 }
        : product.reviews || { total: 225, total_rating: 850, average_rating: 3.8 };

    const locale = useLocale();

    // Breadcrumb items
    const breadcrumbItems = [
        { label: t("home") || "الرئيسية", href: `/${locale}` },
        { label: t("products") || "المنتجات", href: `/${locale}/category` },
        { label: product.name },
    ];

    return (
        <div className={cn("w-full", className)} dir="rtl">
            <PageWrapper yPadding="py-4">
                {/* Breadcrumb */}
                <BreadcrumbBalmy items={breadcrumbItems} className="mb-6" />

                {/* Main Product Section */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
                    {/* Product Images - Right Side in RTL */}
                    <div className="w-full lg:w-1/2">
                        <ProductImageGalleryBalmy
                            baseImage={baseImage}
                            hoverImage={hoverImage}
                            galleryImages={galleryImages}
                            productName={product.name}
                            showQuickBuyBadge={true}
                        />
                    </div>

                    {/* Product Info - Left Side in RTL */}
                    <div className="w-full lg:w-1/2">
                        <ProductInfoBalmy product={product} />
                    </div>
                </div>

                {/* Related Products Section */}
                <RelatedProductsSection
                    categoryIds={product.category_id}
                    currentProductId={product.id}
                    className="border-t border-[var(--color-light-gray-2)]"
                />

                {/* Reviews Section */}
                <ReviewsSectionBalmy
                    reviews={reviews}
                    productId={product.id}
                />
            </PageWrapper>
        </div>
    );
}
