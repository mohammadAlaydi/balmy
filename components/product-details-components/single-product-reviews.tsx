"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import ShadowLayer from "../shadow-layer";
import { useTranslations } from "next-intl";
import StarRating from "../react-stars";

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

  // display-only stars use average rating with halves; interactive uses editable half increments

  return (
    <div className={cn("mb-12", className)}>
      <ShadowLayer>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-3 flex items-center justify-between w-full mb-6 p-0 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          aria-label={isCollapsed ? t("expand-reviews") : t("collapse-reviews")}
        >
          <h2 className="text-[22px] lg:text-[22px] md:text-[18px] font-[600] md:font-[400] text-black font-cairo">
            {t("product-reviews")}
          </h2>
          <div className="text-red-500 hover:text-[#b86a41] transition-colors">
            {isCollapsed ? (
              <MdExpandMore className="text-xl" />
            ) : (
              <MdExpandLess className="text-xl" />
            )}
          </div>
        </button>
      </ShadowLayer>
      <ShadowLayer>
        <div
          className={cn(
            "bg-white rounded-lg p-6  transition-all duration-300",
            isCollapsed && "hidden"
          )}
        >
          {/* Overall Rating Summary */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">
                {reviews.average_rating
                  ? reviews.average_rating.toFixed(1)
                  : "0.0"}
              </div>
              <div className="flex justify-center mt-1">
                <StarRating
                  rating={reviews.average_rating || 0}
                  edit={false}
                  inline
                />
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {reviews.total} {t("reviews")}
              </div>
            </div>

            <div className="flex-1">
              <div className="text-sm text-gray-700 font-cairo">
                {t("overall-rating")}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {t("based-on-reviews", { count: reviews.total })}
              </div>
            </div>
          </div>

          {/* Write Review Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-[20px] lg:text-[20px] md:text-[18px] font-[600] md:font-[400] text-black mb-4 font-cairo">
              {t("write-review")}
            </h3>

            <div className="space-y-4">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-cairo">
                  {t("rating")}
                </label>
                <div className="flex items-center gap-1">
                  <StarRating
                    rating={userRating}
                    edit={true}
                    half={true}
                    onChange={(val) => setUserRating(val)}
                    inline
                  />
                  <span className="text-sm text-gray-600 mr-2">
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
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none font-cairo text-[18px] lg:text-[18px] md:text-[16px]"
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 mt-1 text-left">
                  {reviewText.length}/500
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmitReview}
                disabled={!userRating || !reviewText.trim() || isSubmitting}
                className="bg-red-500 hover:bg-red-500/20 text-white px-6 py-2 rounded-[5px] transition-all duration-300 font-cairo text-[18px] lg:text-[18px] md:text-[16px]"
              >
                {isSubmitting ? tButtons("submitting") : t("submit-review")}
              </Button>
            </div>
          </div>

          {/* Review Guidelines */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-[18px] lg:text-[18px] md:text-[16px] font-[600] md:font-[400] text-black mb-3 font-cairo">
              {t("review-guidelines.title")}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 font-cairo list-disc list-inside">
              <li>{t("review-guidelines.item-1")}</li>
              <li>{t("review-guidelines.item-2")}</li>
              <li>{t("review-guidelines.item-3")}</li>
              <li>{t("review-guidelines.item-4")}</li>
            </ul>
          </div>
        </div>
      </ShadowLayer>
    </div>
  );
}
