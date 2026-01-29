"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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

    const handleRatingChange = (value: string) => {
        if (!onRatingChange) return;
        const rating = parseInt(value);
        // Toggle: if same as current selection, clear; otherwise set
        if (selectedRatings[0] === rating) {
            onRatingChange([]);
        } else {
            onRatingChange([rating]);
        }
    };

    const renderStars = (count: number) => (
        <div className="flex items-center gap-0.5">
            <StarRating rating={count} count={5} half={false} inline className="inline-flex" dir="rtl" />
        </div>
    );

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-black">حسب التقييم</h3>
            <RadioGroup
                value={selectedRatings[0]?.toString() || ""}
                onValueChange={handleRatingChange}
                className="space-y-3"
            >
                {ratingOptions.map((option) => (
                    <div
                        key={option.value}
                        className="flex items-center justify-end gap-3"
                        onClick={() => {
                            if (selectedRatings[0] === option.value) {
                                onRatingChange?.([]);
                            }
                        }}
                    >
                        <Label
                            htmlFor={`rating-${option.value}`}
                            className="flex items-center gap-2 text-sm font-normal cursor-pointer text-medium-gray hover:text-black transition-colors"
                        >
                            {renderStars(option.value)}
                        </Label>
                        <RadioGroupItem
                            id={`rating-${option.value}`}
                            value={option.value.toString()}
                        />
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
