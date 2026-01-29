"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
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

    const handleRatingChange = (rating: number, checked: boolean) => {
        if (!onRatingChange) return;

        if (checked) {
            onRatingChange([...selectedRatings, rating]);
        } else {
            onRatingChange(selectedRatings.filter((r) => r !== rating));
        }
    };

    const renderStars = (count: number) => {
        return (
            <div className="flex items-center gap-0.5">
                <StarRating rating={count} count={5} half={false} inline className="inline-flex" />
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-black">حسب التقييم</h3>
            <div className="space-y-3">
                {ratingOptions.map((option) => (
                    <div
                        key={option.value}
                        className="flex items-start space-x-2 space-x-reverse"
                    >
                        <Checkbox
                            id={`rating-${option.value}`}
                            checked={selectedRatings.includes(option.value)}
                            onCheckedChange={(checked) =>
                                handleRatingChange(option.value, checked as boolean)
                            }
                        />
                        <Label
                            htmlFor={`rating-${option.value}`}
                            className="flex items-center gap-2 text-sm font-normal cursor-pointer text-medium-gray hover:text-black transition-colors"
                        >
                            {renderStars(option.value)}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
