"use client";

import { Star } from "lucide-react";

export type RatingProps = {
  value: number; // 0-5
  max?: number;
  showValue?: boolean;
  className?: string;
};

export default function Rating({ value, max = 5, showValue = false, className = "" }: RatingProps) {
  const filled = Math.max(0, Math.min(max, Math.floor(value)));
  const hasHalf = value % 1 >= 0.5;
  const empty = Math.max(0, max - filled - (hasHalf ? 1 : 0));

  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={`التقييم ${value} من ${max}`}>
      {/* Filled stars */}
      {Array.from({ length: filled }).map((_, i) => (
        <Star key={`filled-${i}`} className="h-4 w-4 fill-yellow text-yellow" aria-hidden />
      ))}
      
      {/* Half star */}
      {hasHalf ? (
        <div className="relative h-4 w-4" key="half">
          <Star className="h-4 w-4 text-light-gray-3" aria-hidden />
          <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
            <Star className="h-4 w-4 fill-yellow text-yellow" aria-hidden />
          </div>
        </div>
      ) : null}
      
      {/* Empty stars */}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-light-gray-3" aria-hidden />
      ))}
      
      {showValue ? (
        <span className="mr-1 text-sm text-medium-gray">({value})</span>
      ) : null}
    </div>
  );
}
