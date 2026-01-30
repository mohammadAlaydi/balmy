"use client";

import React from "react";
import { cn } from "@/lib/utils";
import RatingBalmy from "@/components/balmy/rating-balmy";

export interface ReviewCardBalmyProps {
    reviewerName: string;
    rating: number;
    date: string;
    verified: boolean;
    platform: "website" | "app";
    reviewText: string;
    className?: string;
}

export default function ReviewCardBalmy({
    reviewerName,
    rating,
    date,
    verified,
    platform,
    reviewText,
    className,
}: ReviewCardBalmyProps) {
    return (
        <div
            className={cn(
                "w-full bg-white border border-[#C4C5C6] rounded-lg p-6 md:p-8 flex flex-col gap-4 text-right",
                className
            )}
            dir="rtl"
        >
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {/* Right Side: Name and Rating */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg md:text-xl font-bold text-black font-cairo">
                        {reviewerName}
                    </h3>
                    <div className="flex items-center gap-2">
                        <RatingBalmy value={rating} />
                        <span className="text-base font-normal text-black font-cairo">
                            {rating}
                        </span>
                    </div>
                </div>

                {/* Left Side: Verified Badge */}
                {verified && (
                    <div className="bg-[#E91E63] text-white px-3 py-1 rounded-[12px] text-xs font-cairo self-start md:self-center">
                        مؤكد بــه
                    </div>
                )}
            </div>

            {/* Middle Section: Review Text */}
            <div className="text-base md:text-[16px] text-[#333333] leading-[1.8] font-cairo">
                {reviewText}
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-center mt-2">
                <div className="bg-[#E3F2FD] text-[#2196F3] px-3 py-1 rounded-[12px] text-xs font-cairo">
                    {platform === "website" ? "موقع بــه" : "تطبيق بــه"}
                </div>
                <span className="text-sm text-[#666666] font-cairo" dir="ltr">
                    {date}
                </span>
            </div>
        </div>
    );
}
