"use client";

import React from "react";

interface PriceRange {
    id: string;
    label: string;
    min: number;
    max: number | null;
}

interface FilterPriceProps {
    selectedRanges?: string[];
    onPriceChange?: (ranges: string[]) => void;
}

export default function FilterPrice({
    selectedRanges = [],
    onPriceChange,
}: FilterPriceProps) {
    const priceRanges: PriceRange[] = [
        { id: "under-200", label: "أقل من 200", min: 0, max: 200 },
        { id: "200-400", label: "200 : 400", min: 200, max: 400 },
        { id: "400-600", label: "400 : 600", min: 400, max: 600 },
        { id: "over-600", label: "أكثر من600", min: 600, max: null },
    ];

    const handlePriceClick = (rangeId: string) => {
        if (!onPriceChange) return;
        if (selectedRanges[0] === rangeId) {
            onPriceChange([]);
        } else {
            onPriceChange([rangeId]);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-center text-black">حسب السعر</h3>
            <div className="flex justify-center">
                <div className="inline-flex flex-col space-y-3">
                    {priceRanges.map((range) => {
                        const isSelected = selectedRanges[0] === range.id;
                        return (
                            <div
                                key={range.id}
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() => handlePriceClick(range.id)}
                            >
                                <span
                                    className={`inline-block w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors duration-200 ${isSelected
                                        ? "border-black bg-black"
                                        : "border-gray-400 bg-white group-hover:border-gray-600"
                                        }`}
                                />
                                <span
                                    className={`text-base transition-colors duration-200 ${isSelected
                                        ? "font-bold text-black"
                                        : "text-gray-600 group-hover:text-black"
                                        }`}
                                >
                                    {range.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
