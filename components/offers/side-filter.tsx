"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import FilterCategories from "./filter-categories";
import FilterRating from "./filter-rating";
import FilterPrice from "./filter-price";
import FilterBrands from "./filter-brands";

interface SideFilterProps {
    activeCategoryId?: string | number;
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
    activeCategoryId,
    selectedCategories = [],
    selectedRatings = [],
    selectedPriceRanges = [],
    selectedBrands = [],
    onCategoryChange,
    onRatingChange,
    onPriceChange,
    onBrandChange,
}: SideFilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    const FilterContent = () => (
        <div className="space-y-8 w-full" dir="rtl">
            {/* Filter Categories - navigation links from API */}
            <FilterCategories activeCategoryId={activeCategoryId} />

            <div className="border-t border-gray-200" />

            {/* Filter by Rating */}
            <FilterRating
                selectedRatings={selectedRatings}
                onRatingChange={onRatingChange}
            />

            <div className="border-t border-gray-200" />

            {/* Filter by Price */}
            <FilterPrice
                selectedRanges={selectedPriceRanges}
                onPriceChange={onPriceChange}
            />

            <div className="border-t border-gray-200" />

            {/* Filter by Brands */}
            <FilterBrands
                selectedBrands={selectedBrands}
                onBrandChange={onBrandChange}
            />
        </div>
    );

    return (
        <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-gray-300">
                            <Filter className="h-4 w-4" />
                            <span>الفلاتر</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[380px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="text-right">الفلاتر</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                            <FilterContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <FilterContent />
            </div>
        </>
    );
}
