"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Brand {
    id: string;
    name: string;
    count: number;
}

interface FilterBrandsProps {
    selectedBrands?: string[];
    onBrandChange?: (brands: string[]) => void;
}

export default function FilterBrands({
    selectedBrands = [],
    onBrandChange,
}: FilterBrandsProps) {
    // Sample brands with product counts
    const brands: Brand[] = [
        { id: "dior", name: "ديور", count: 23 },
        { id: "gucci", name: "غوتشي", count: 18 },
        { id: "chanel", name: "شانيل", count: 31 },
        { id: "ysl", name: "سان لوران", count: 15 },
        { id: "versace", name: "فيرزاتشي", count: 12 },
        { id: "armani", name: "أرماني", count: 27 },
        { id: "burberry", name: "بربري", count: 9 },
        { id: "prada", name: "برادا", count: 14 },
    ];

    const handleBrandChange = (brandId: string, checked: boolean) => {
        if (!onBrandChange) return;

        if (checked) {
            onBrandChange([...selectedBrands, brandId]);
        } else {
            onBrandChange(selectedBrands.filter((b) => b !== brandId));
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-black">حسب الماركة</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
                {brands.map((brand) => (
                    <div
                        key={brand.id}
                        className="flex items-start space-x-2 space-x-reverse"
                    >
                        <Checkbox
                            id={brand.id}
                            checked={selectedBrands.includes(brand.id)}
                            onCheckedChange={(checked) =>
                                handleBrandChange(brand.id, checked as boolean)
                            }
                        />
                        <Label
                            htmlFor={brand.id}
                            className="text-sm font-normal cursor-pointer text-medium-gray hover:text-black transition-colors"
                        >
                            {brand.name}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
