"use client";

import React from "react";
import StarRating from "@/components/react-stars";

interface RatingOption {
    value: number;
}

interface FilterRatingProps {
    selectedRatings?: number[];
    onRatingChange?: (ratings: number[]) => void;
}

export default function FilterRating({
    selectedRatings = [],
    onRatingChange,
}: FilterRatingProps) {
    const ratingOptions: RatingOption[] = [
        { value: 5 },
        { value: 4 },
        { value: 3 },
        { value: 2 },
        { value: 1 },
    ];

    const handleRatingClick = (rating: number) => {
        if (!onRatingChange) return;
        if (selectedRatings[0] === rating) {
            onRatingChange([]);
        } else {
            onRatingChange([rating]);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-center text-black">حسب التقييم</h3>
            <div className="flex justify-center">
                <div className="inline-flex flex-col space-y-3">
                    {ratingOptions.map((option) => {
                        const isSelected = selectedRatings[0] === option.value;
                        return (
                            <div
                                key={option.value}
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() => handleRatingClick(option.value)}
                            >
                                <span
                                    className={`inline-block w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors duration-200 ${isSelected
                                            ? "border-black bg-black"
                                            : "border-gray-400 bg-white group-hover:border-gray-600"
                                        }`}
                                />
                                <div className="flex items-center gap-0.5">
                                    <StarRating rating={option.value} count={5} half={false} inline className="inline-flex" dir="rtl" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
