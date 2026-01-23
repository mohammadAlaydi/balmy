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
        <div className="bg-white border border-light-gray-2 rounded-lg p-6 sticky top-6">
            <div className="space-y-6">
                {/* Filter Categories */}
                <FilterCategories
                    selectedCategories={selectedCategories}
                    onCategoryChange={onCategoryChange}
                    useRadio={false}
                />

                <Separator className="bg-light-gray-2" />

                {/* Filter by Rating */}
                <FilterRating
                    selectedRatings={selectedRatings}
                    onRatingChange={onRatingChange}
                />

                <Separator className="bg-light-gray-2" />

                {/* Filter by Price */}
                <FilterPrice
                    selectedPriceRanges={selectedPriceRanges}
                    onPriceChange={onPriceChange}
                />

                <Separator className="bg-light-gray-2" />

                {/* Filter by Brands */}
                <FilterBrands
                    selectedBrands={selectedBrands}
                    onBrandChange={onBrandChange}
                />
            </div>
        </div>
    );
}
