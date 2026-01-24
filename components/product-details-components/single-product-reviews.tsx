"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useTranslations } from "next-intl";
import StarRating from "../react-stars";
import RatingBalmy from "../balmy/rating-balmy";

interface SingleProductReviewsProps {
  reviews: {
    total: number;
    total_rating: number;
    average_rating: number | null;
  };
  productId: number;
  productName: string;
  className?: string;
}

export default function SingleProductReviews({
  reviews,
  productId,
  productName,
  className,
}: SingleProductReviewsProps) {
  const t = useTranslations("product-details");
  const tButtons = useTranslations("buttons");
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSubmitReview = async () => {
    if (!userRating || !reviewText.trim()) {
      return;
    }

    setIsSubmitting(true);
    // Here you would integrate with your review API
    // For now, we'll simulate the submission
    setTimeout(() => {
      setIsSubmitting(false);
      setUserRating(0);
      setReviewText("");
      // Show success message
    }, 1000);
  };

  // Mock rating distribution data (replace with real data from API)
  const ratingDistribution = [
    { stars: 5, count: Math.floor(reviews.total * 0.6) },
    { stars: 4, count: Math.floor(reviews.total * 0.2) },
    { stars: 3, count: Math.floor(reviews.total * 0.1) },
    { stars: 2, count: Math.floor(reviews.total * 0.05) },
    { stars: 1, count: Math.floor(reviews.total * 0.05) },
  ];

  // display-only stars use average rating with halves; interactive uses editable half increments

  return (
    <div className={cn("mb-12", className)}>
      <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border-gray-200 p-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between w-full mb-6 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          aria-label={isCollapsed ? t("expand-reviews") : t("collapse-reviews")}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-black font-cairo">
            {t("product-reviews")}
          </h2>
          <div className="text-black hover:text-gray-600 transition-colors">
            {isCollapsed ? (
              <MdExpandMore className="text-2xl" />
            ) : (
              <MdExpandLess className="text-2xl" />
            )}
          </div>
        </button>

        <div
          className={cn(
            "transition-all duration-300",
            isCollapsed && "hidden"
          )}
        >
          {/* Overall Rating Summary with Rating Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 p-6 bg-gray-50 rounded-lg">
            {/* Rating Score */}
            <div className="flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-gray-200 pb-6 lg:pb-0">
              <div className="text-5xl font-bold text-yellow-500 mb-2">
                {reviews.average_rating
                  ? reviews.average_rating.toFixed(1)
                  : "0.0"}
              </div>
              <div className="flex justify-center mb-2">
                <RatingBalmy value={reviews.average_rating || 0} />
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {t("based-on-reviews", { count: reviews.total })}
              </div>
            </div>

            {/* Rating Distribution Bars */}
            <div className="flex flex-col gap-2 justify-center">
              {ratingDistribution.map(({ stars, count }) => {
                const percentage = reviews.total > 0 ? (count / reviews.total) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 min-w-[60px]">
                      <span className="text-sm font-medium text-gray-700">{stars}</span>
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 min-w-[40px] text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Write Review Section */}
          <Card className="border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-black mb-4 font-cairo">
              {t("write-review")}
            </h3>

            <div className="space-y-4">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-cairo">
                  {t("rating")}
                </label>
                <div className="flex items-center gap-2">
                  <StarRating
                    rating={userRating}
                    edit={true}
                    half={true}
                    onChange={(val) => setUserRating(val)}
                    inline
                  />
                  <span className="text-sm text-gray-600 ltr:ml-2 rtl:mr-2">
                    {userRating > 0
                      ? t("rating-out-of", { rating: userRating })
                      : t("choose-rating")}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-cairo">
                  {t("review-comment")}
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={t("review-placeholder")}
                  className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none font-cairo text-base"
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 mt-1 ltr:text-left rtl:text-right">
                  {reviewText.length}/500
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmitReview}
                disabled={!userRating || !reviewText.trim() || isSubmitting}
                className="bg-black hover:bg-black/85 text-white px-8 py-3 rounded-lg transition-all duration-300 font-cairo disabled:opacity-50"
              >
                {isSubmitting ? tButtons("submitting") : t("submit-review")}
              </Button>
            </div>
          </Card>

          {/* Review Guidelines */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <h4 className="text-base font-semibold text-black mb-3 font-cairo">
              {t("review-guidelines.title")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 font-cairo list-disc ltr:list-inside rtl:list-outside ltr:pl-0 rtl:pr-5">
              <li>{t("review-guidelines.item-1")}</li>
              <li>{t("review-guidelines.item-2")}</li>
              <li>{t("review-guidelines.item-3")}</li>
              <li>{t("review-guidelines.item-4")}</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
