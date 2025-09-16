"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  MdOutlineStar,
  MdOutlineStarBorder,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import ShadowLayer from "./shadow-layer";

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
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
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

  const renderStars = (
    rating: number,
    interactive = false,
    size = "text-xl"
  ) => {
    return [...Array(5)].map((_, i) => {
      const starValue = i + 1;
      const isFilled = starValue <= rating;
      const isHovered = interactive && starValue <= hoverRating;

      return (
        <button
          key={i}
          type={interactive ? "button" : undefined}
          onClick={interactive ? () => setUserRating(starValue) : undefined}
          onMouseEnter={
            interactive ? () => setHoverRating(starValue) : undefined
          }
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          className={cn(
            size,
            "transition-colors",
            interactive && "cursor-pointer",
            isFilled || isHovered
              ? "text-[#ffd700] fill-current"
              : "text-gray-300"
          )}
        >
          {isFilled || isHovered ? <MdOutlineStar /> : <MdOutlineStarBorder />}
        </button>
      );
    });
  };

  return (
    <div className={cn("mb-12", className)}>
      <ShadowLayer>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-3 flex items-center justify-between w-full mb-6 p-0 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          aria-label={
            isCollapsed ? "عرض تقييمات المنتج" : "إخفاء تقييمات المنتج"
          }
        >
          <h2 className="text-[22px] lg:text-[22px] md:text-[18px] font-[600] md:font-[400] text-black font-cairo">
            تقييمات المنتج
          </h2>
          <div className="text-[#D07A51] hover:text-[#b86a41] transition-colors">
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
              <div className="text-3xl font-bold text-[#D07A51]">
                {reviews.average_rating
                  ? reviews.average_rating.toFixed(1)
                  : "0.0"}
              </div>
              <div className="flex justify-center mt-1">
                {renderStars(reviews.average_rating || 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {reviews.total} تقييم
              </div>
            </div>

            <div className="flex-1">
              <div className="text-sm text-gray-700 font-cairo">
                معدل التقييم العام للمنتج
              </div>
              <div className="text-xs text-gray-500 mt-1">
                بناءً على {reviews.total} تقييم من العملاء
              </div>
            </div>
          </div>

          {/* Write Review Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-[20px] lg:text-[20px] md:text-[18px] font-[600] md:font-[400] text-black mb-4 font-cairo">
              اكتب تقييمك
            </h3>

            <div className="space-y-4">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-cairo">
                  تقييمك
                </label>
                <div className="flex items-center gap-1">
                  {renderStars(userRating, true)}
                  <span className="text-sm text-gray-600 mr-2">
                    {userRating > 0 ? `${userRating} من 5` : "اختر التقييم"}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-cairo">
                  تعليقك
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="اكتب تجربتك مع هذا المنتج..."
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D07A51] focus:border-transparent resize-none font-cairo text-[18px] lg:text-[18px] md:text-[16px]"
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
                className="bg-[#D07A51] hover:bg-[#b86a41] text-white px-6 py-2 rounded-[5px] transition-all duration-300 font-cairo text-[18px] lg:text-[18px] md:text-[16px]"
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
              </Button>
            </div>
          </div>

          {/* Review Guidelines */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-[18px] lg:text-[18px] md:text-[16px] font-[600] md:font-[400] text-black mb-3 font-cairo">
              إرشادات التقييم
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 font-cairo">
              <li>• اكتب تقييمك بناءً على تجربتك الشخصية مع المنتج</li>
              <li>• كن موضوعياً ومفيداً للعملاء الآخرين</li>
              <li>• تجنب استخدام لغة مسيئة أو غير مناسبة</li>
              <li>• ركز على جودة المنتج وليس على خدمة التوصيل</li>
            </ul>
          </div>
        </div>
      </ShadowLayer>
    </div>
  );
}
