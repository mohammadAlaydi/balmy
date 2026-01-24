"use client";

import { Star } from "lucide-react";

export interface RatingBalmyProps {
    value: number;
    max?: number;
}

export default function RatingBalmy({ value, max = 5 }: RatingBalmyProps) {
    const filled = Math.max(0, Math.min(max, Math.floor(value)));
    const hasHalf = value % 1 >= 0.5;
    const empty = Math.max(0, max - filled - (hasHalf ? 1 : 0));

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: filled }).map((_, i) => (
                <Star key={`filled-${i}`} className="h-3 w-3 md:h-4 md:w-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
            ))}
            {hasHalf && (
                <div className="relative h-3 w-3 md:h-4 md:w-4">
                    <Star className="h-3 w-3 md:h-4 md:w-4 text-[var(--color-light-gray-3)]" />
                    <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                    </div>
                </div>
            )}
            {Array.from({ length: empty }).map((_, i) => (
                <Star key={`empty-${i}`} className="h-3 w-3 md:h-4 md:w-4 text-[var(--color-light-gray-3)]" />
            ))}
        </div>
    );
}
