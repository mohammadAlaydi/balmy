"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PriceRange {
    id: string;
    label: string;
    min: number;
    max: number | null; // null means no upper limit
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
        { id: "under-200", label: "أقل من 200 ريال", min: 0, max: 200 },
        { id: "200-400", label: "200 - 400 ريال", min: 200, max: 400 },
        { id: "400-600", label: "400 - 600 ريال", min: 400, max: 600 },
        { id: "600-800", label: "600 - 800 ريال", min: 600, max: 800 },
        { id: "800-1000", label: "800 - 1000 ريال", min: 800, max: 1000 },
        { id: "over-1000", label: "أكثر من 1000 ريال", min: 1000, max: null },
    ];

    const handlePriceChange = (rangeId: string, checked: boolean) => {
        if (!onPriceChange) return;

        if (checked) {
            onPriceChange([...selectedRanges, rangeId]);
        } else {
            onPriceChange(selectedRanges.filter((r) => r !== rangeId));
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-black">حسب السعر</h3>
            <div className="space-y-3">
                {priceRanges.map((range) => (
                    <div
                        key={range.id}
                        className="flex items-start space-x-2 space-x-reverse"
                    >
                        <Checkbox
                            id={range.id}
                            checked={selectedRanges.includes(range.id)}
                            onCheckedChange={(checked) =>
                                handlePriceChange(range.id, checked as boolean)
                            }
                        />
                        <Label
                            htmlFor={range.id}
                            className="text-sm font-normal cursor-pointer text-medium-gray hover:text-black transition-colors"
                        >
                            {range.label}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
