"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import FilterCategories from "./filter-categories";
import FilterRating from "./filter-rating";
import FilterPrice from "./filter-price";
import FilterBrands from "./filter-brands";

interface SideFilterProps {
    selectedCategories?: string[];
    selectedRatings?: number[];
    selectedPriceRanges?: string[];
    selectedBrands?: string[];
    onCategoryChange?: (categories: string[]) => void;
    onRatingChange?: (ratings: number[]) => void;
    onPriceChange?: (ranges: string[]) => void;
    onBrandChange?: (brands: string[]) => void;
}

export default function SideFilter({
    selectedCategories = [],
    selectedRatings = [],
    selectedPriceRanges = [],
    selectedBrands = [],
    onCategoryChange,
    onRatingChange,
    onPriceChange,
    onBrandChange,
}: SideFilterProps) {
    return (
        <div className="bg-transparent p-6 sticky top-6">
            <div className="space-y-6 w-full max-w-xs mx-auto">
                {/* Filter Categories */}
                <div className="w-full">
                    <FilterCategories
                        selectedCategories={selectedCategories}
                        onCategoryChange={onCategoryChange}
                        useRadio={false}
                    />
                </div>

                <Separator className="bg-light-gray-2 w-full" />

                {/* Filter by Rating */}
                <div className="w-full">
                    <FilterRating
                        selectedRatings={selectedRatings}
                        onRatingChange={onRatingChange}
                    />
                </div>

                <Separator className="bg-light-gray-2 w-full" />

                {/* Filter by Price */}
                <div className="w-full">
                    <FilterPrice
                        selectedRanges={selectedPriceRanges}
                        onPriceChange={onPriceChange}
                    />
                </div>

                <Separator className="bg-light-gray-2 w-full" />

                {/* Filter by Brands */}
                <div className="w-full">
                    <FilterBrands
                        selectedBrands={selectedBrands}
                        onBrandChange={onBrandChange}
                    />
                </div>
            </div>
        </div>
    );
}
