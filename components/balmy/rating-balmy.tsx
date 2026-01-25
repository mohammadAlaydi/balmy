"use client";

import { Rating, RatingButton } from "@/components/ui/rating";

export interface RatingBalmyProps {
    value: number;
    max?: number;
}

export default function RatingBalmy({ value, max = 5 }: RatingBalmyProps) {
    return (
        <Rating readOnly value={value} max={max}>
            {Array.from({ length: max }).map((_, i) => (
                <RatingButton key={i} size={16} />
            ))}
        </Rating>
    );
}
