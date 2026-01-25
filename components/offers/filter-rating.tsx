"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Rating, RatingButton } from "@/components/ui/rating";

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
        onRatingChange([rating]);
    };



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
                    >
                        <Label
                            htmlFor={`rating-${option.value}`}
                            className="flex items-center gap-2 text-sm font-normal cursor-pointer text-medium-gray hover:text-black transition-colors"
                        >
                            <Rating readOnly value={option.value}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <RatingButton key={i} />
                                ))}
                            </Rating>
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
