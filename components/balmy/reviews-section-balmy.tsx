"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { MdStar, MdStarBorder } from "react-icons/md";
import { Rating, RatingButton } from "@/components/ui/rating";
import StarRating from "@/components/react-stars";

interface ReviewsSectionBalmyProps {
    reviews: {
        total: number;
        total_rating?: number;
        average_rating?: number | null;
    };
    reviewArray?: {
        "5": number;
        "4": number;
        "3": number;
        "2": number;
        "1": number;
    };
    productId: number;
    className?: string;
}

export default function ReviewsSectionBalmy({
    reviews,
    reviewArray,
    productId,
    className,
}: ReviewsSectionBalmyProps) {
    const t = useTranslations("product-details");

    // Calculate total reviews and average rating from reviewArray
    const calculateRatingStats = () => {
        if (!reviewArray) {
            return {
                total: reviews.total || 0,
                average: reviews.average_rating || 0,
                distribution: [
                    { stars: 5, count: 0, percentage: 0 },
                    { stars: 4, count: 0, percentage: 0 },
                    { stars: 3, count: 0, percentage: 0 },
                    { stars: 2, count: 0, percentage: 0 },
                    { stars: 1, count: 0, percentage: 0 },
                ]
            };
        }

        const counts = {
            5: reviewArray["5"] || 0,
            4: reviewArray["4"] || 0,
            3: reviewArray["3"] || 0,
            2: reviewArray["2"] || 0,
            1: reviewArray["1"] || 0,
        };

        const total = counts[5] + counts[4] + counts[3] + counts[2] + counts[1];
        const weightedSum = (counts[5] * 5) + (counts[4] * 4) + (counts[3] * 3) + (counts[2] * 2) + (counts[1] * 1);
        const average = total > 0 ? weightedSum / total : 0;

        const distribution = [5, 4, 3, 2, 1].map(stars => ({
            stars,
            count: counts[stars as keyof typeof counts],
            percentage: total > 0 ? Math.round((counts[stars as keyof typeof counts] / total) * 100) : 0
        }));

        return { total, average, distribution };
    };

    const ratingStats = calculateRatingStats();
    const ratingDistribution = ratingStats.distribution;

    // Mock data for reviews since the previous implementation also used mock data for the list
    // In a real app, this would come from an API based on productId
    const reviewsList = [
        {
            id: 1,
            name: "محمد احمد عبدالرزاق",
            rating: 5,
            date: "12/28/2025",
            content:
                "هذا العطر رائع بكل معنى الكلمة! يمتاز برائحة جذابة ومميزة تجمع بين الأنوثة والأناقة بشكل متناغم. يدوم طويلا على البشرة والملابس ويمنحك شعورا بالثقة طوال اليوم. حقا من أفضل الروائح التي جربتها مؤخرا وأنصح به بشدة لمن يبحث عن عطر يعكس الأناقة والرقي.",
        },
        {
            id: 2,
            name: "سارة خالد",
            rating: 4,
            date: "12/20/2025",
            content:
                "العطر جميل وثابت، لكن السعر مرتفع قليلاً مقارنة بالحجم. التغليف كان ممتازاً والشحن سريع جداً. شكراً لكم.",
        },
    ];

    return (
        <div className={cn("w-full mb-16", className)} dir="rtl">
            {/* Aggregate Ratings Section - التقييمات */}
            <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8 text-right text-gray-900 dark:text-white flex items-center gap-4 font-cairo">
                    {t("reviews") || "التقييمات"}
                    <span className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></span>
                </h2>

                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        {/* Overall Rating Score */}
                        <div className="flex flex-col items-center justify-center min-w-[150px]">
                            <span className="text-6xl font-medium text-gray-900 dark:text-white mb-2 font-cairo">
                                {ratingStats.average.toFixed(1)}
                            </span>
                            <div className="mb-2">
                                <StarRating
                                    rating={ratingStats.average}
                                    edit={false}
                                    inline={true}
                                    dir="ltr"
                                    size={28}
                                />
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-cairo">
                                عدد التقييمات {ratingStats.total}
                            </span>
                        </div>

                        {/* Rating Distribution Bars */}
                        <div className="flex-grow w-full max-w-xl">
                            {ratingDistribution.map(({ stars, count, percentage }) => (
                                <div key={stars} className="flex items-center gap-3 mb-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400 w-3 font-medium font-cairo">
                                        {stars}
                                    </span>
                                    <MdStar className="text-yellow-400 text-sm" />
                                    <div className="flex-grow h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gray-900 dark:bg-gray-400 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 w-8 text-left font-cairo">
                                        {count}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Write Review Button */}
                        <div className="flex flex-col items-center">
                            <button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 text-white px-10 py-3 rounded-full font-bold mb-3 transition-colors shadow-lg font-cairo">
                                سجل تقييمك
                            </button>
                            <span className="text-xs text-gray-400 font-cairo">
                                الشروط والأحكام الخاصة بالنشر
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Reviews Section - آخر التقييمات */}
            <section>
                <h2 className="text-2xl font-bold mb-8 text-right text-gray-900 dark:text-white flex items-center gap-4 font-cairo">
                    {t("latest-reviews") || "آخر التقييمات"}
                    <span className="flex-grow h-px bg-gray-200 dark:bg-gray-700"></span>
                </h2>

                <div className="flex flex-col gap-6">
                    {reviewsList.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-200 dark:border-gray-700 p-8 shadow-sm"
                        >
                            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                                {/* Reviewer Name */}
                                <div className="md:w-[200px] shrink-0">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 font-cairo">
                                        {review.name}
                                    </h4>
                                </div>

                                {/* Vertical Divider */}
                                <div className="hidden md:block w-px bg-black h-auto self-stretch"></div>

                                {/* Review Content */}
                                <div className="flex-1 flex flex-col items-start text-right">
                                    <div className="flex items-center text-sm mb-2 gap-2">
                                        <StarRating
                                            rating={review.rating}
                                            edit={false}
                                            inline={true}
                                            dir="ltr"
                                            size={20}
                                        />
                                        <span className="font-bold text-gray-900 dark:text-white font-cairo text-[30px]">
                                            {review.rating}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-2 font-cairo">
                                        {review.content}
                                    </p>
                                    <a className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline font-cairo" href="#">
                                        موصي به
                                    </a>
                                </div>

                                {/* Date */}
                                <div className="md:w-[120px] shrink-0 text-left self-start md:self-center">
                                    <span className="text-sm font-medium text-gray-400 font-mono">
                                        {review.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
