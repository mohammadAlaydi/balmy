"use client";

import React, { useState } from "react";
import { BreadcrumbBalmy } from "@/components/balmy";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import FilterCategories from "./filter-categories";
import FilterRating from "./filter-rating";
import FilterPrice from "./filter-price";
import FilterBrands from "./filter-brands";

interface SideFilterProps {
    breadcrumbItems?: { label: string; href?: string }[];
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
    breadcrumbItems,
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
        <div className="space-y-6 w-full">
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
    );

    return (
        <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                            <Filter className="h-4 w-4" />
                            <span>الفلاتر</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>الفلاتر</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                            <FilterContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block bg-transparent p-6 sticky top-6">
                <div className="max-w-xs mx-auto">
                    <FilterContent />
                </div>
            </div>
        </>
    );
}
