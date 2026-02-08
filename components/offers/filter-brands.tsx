"use client";

import React from "react";

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
    const brands: Brand[] = [
        { id: "dior", name: "ديور", count: 23 },
        { id: "dolce", name: "دولشي", count: 12 },
        { id: "dolce-gabbana", name: "دولشي جابانا", count: 74 },
        { id: "chanel", name: "شانيل", count: 34 },
        { id: "exclusive", name: "حصريات", count: 32 },
        { id: "giorgio-armani", name: "جورجيو اماني", count: 65 },
        { id: "ysl", name: "اف سان لوران", count: 8 },
        { id: "givenchy", name: "جفنشي", count: 23 },
        { id: "versace", name: "فيرزاتشي", count: 19 },
        { id: "guerlain", name: "جيرلان", count: 54 },
        { id: "jean-paul", name: "جان بول", count: 11 },
        { id: "gucci", name: "غوتشي", count: 84 },
    ];

    const handleBrandChange = (brandId: string) => {
        if (!onBrandChange) return;
        if (selectedBrands[0] === brandId) {
            onBrandChange([]);
        } else {
            onBrandChange([brandId]);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-center text-black">حسب الماركة</h3>
            <div className="flex justify-center">
                <div className="inline-flex flex-col space-y-2.5">
                    {brands.map((brand) => {
                        const isSelected = selectedBrands[0] === brand.id;
                        return (
                            <div
                                key={brand.id}
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() => handleBrandChange(brand.id)}
                            >
                                <span className="text-base text-gray-400 font-medium min-w-[24px] text-center">
                                    {brand.count}
                                </span>
                                <span
                                    className={`text-base transition-colors duration-200 ${isSelected
                                        ? "font-bold text-black"
                                        : "text-gray-600 group-hover:text-black"
                                        }`}
                                >
                                    {brand.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
