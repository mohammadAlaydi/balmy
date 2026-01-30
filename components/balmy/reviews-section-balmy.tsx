"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import RatingBalmy from "@/components/balmy/rating-balmy";
import ReviewCardBalmy from "@/components/balmy/review-card-balmy";

interface ReviewsSectionBalmyProps {
    reviews: {
        total: number;
        total_rating?: number;
        average_rating?: number | null;
    };
    productId: number;
    className?: string;
}

export default function ReviewsSectionBalmy({
    reviews,
    productId,
    className,
}: ReviewsSectionBalmyProps) {
    const t = useTranslations("product-details");

    // Mock rating distribution based on total reviews
    const ratingDistribution = [
        { stars: 5, count: Math.floor(reviews.total * 0.45), percentage: 45 },
        { stars: 4, count: Math.floor(reviews.total * 0.25), percentage: 25 },
        { stars: 3, count: Math.floor(reviews.total * 0.15), percentage: 15 },
        { stars: 2, count: Math.floor(reviews.total * 0.10), percentage: 10 },
        { stars: 1, count: Math.floor(reviews.total * 0.05), percentage: 5 },
    ];

    const handleWriteReview = () => {
        // TODO: Implement write review functionality
        // Could open a modal or navigate to review form
    };

    return (
        <div className={cn("py-8 border-t border-[var(--color-light-gray-2)]", className)} dir="rtl">
            {/* Section Title */}
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-black)] font-cairo mb-6">
                {t("reviews") || "التقييمات"}
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Side - Overall Rating */}
                <div className="flex flex-col items-center justify-center text-center md:w-1/3">
                    {/* Large Rating Number */}
                    <div className="text-5xl md:text-6xl font-bold text-[var(--color-black)] font-cairo mb-2">
                        {reviews.average_rating?.toFixed(1) || "3.8"}
                    </div>

                    {/* Stars */}
                    <div className="mb-2">
                        <RatingBalmy value={reviews.average_rating || 3.8} />
                    </div>

                    {/* Review Count */}
                    <span className="text-sm text-[var(--color-medium-gray)] font-cairo">
                        {reviews.total || 225} {t("reviews-count") || "التقييمات"}
                    </span>
                </div>

                {/* Right Side - Rating Breakdown */}
                <div className="flex-1">
                    <div className="flex flex-col gap-3">
                        {ratingDistribution.map(({ stars, count, percentage }) => (
                            <div key={stars} className="flex items-center gap-3">
                                {/* Stars Label */}
                                <div className="flex items-center gap-1 min-w-[40px]">
                                    <span className="text-sm font-medium text-[var(--color-black)] font-cairo">
                                        {stars}
                                    </span>
                                    <svg
                                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                </div>

                                {/* Progress Bar */}
                                <div className="flex-1 h-3 bg-[var(--color-light-gray)] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>

                                {/* Count */}
                                <span className="text-sm text-[var(--color-medium-gray)] font-cairo min-w-[35px] text-left">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Write Review CTA */}
            <div className="mt-8 flex flex-col items-center text-center gap-3 border-b border-[var(--color-light-gray-2)] pb-8 mb-8">
                <Button
                    onClick={handleWriteReview}
                    className="h-12 px-8 bg-[var(--color-black)] text-white hover:bg-[var(--color-dark-gray)] font-cairo text-base font-semibold rounded-lg"
                >
                    {t("write-review-cta") || "سجل تقييماً"}
                </Button>
                <p className="text-sm text-[var(--color-medium-gray)] font-cairo">
                    {t("review-cta-subtitle") || "احصل على مشترياتك واحكم عليها بنفسك"}
                </p>
            </div>

            {/* Latest Reviews Section */}
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[var(--color-black)] font-cairo">
                        {t("latest-reviews") || "أحدث التقييمات"}
                    </h3>
                    <span className="text-sm text-[var(--color-medium-gray)] font-cairo">
                        {t("reviews-count-label") || "عدد التقييمات"} {reviews.total || 225}
                    </span>
                </div>

                {/* Reviews List */}
                <div className="flex flex-col gap-5">
                    {[1, 2, 3].map((id) => (
                        <ReviewCardBalmy
                            key={id}
                            reviewerName="محمد احمد عبدالرزاق"
                            rating={5}
                            date="12/28/2025"
                            verified={true}
                            platform="website"
                            reviewText="هذا المنتج رائع جداً ومناسب جداً من حيث الجودة والسعر، أنصح الجميع بشراءه."
                        />
                    ))}
                </div>

                {/* Show All Reviews Button */}
                <button
                    className="block mx-auto mt-8 bg-black text-white px-10 py-3 rounded-full font-cairo text-base hover:bg-gray-800 transition-colors"
                >
                    {t("view-all-reviews") || "مشاهدة جميع التقييمات"}
                </button>
            </div>
        </div>
    );
}
