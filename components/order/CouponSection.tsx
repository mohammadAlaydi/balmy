"use client";

import { useState } from "react";

export interface CouponSectionProps {
    onApplyCoupon: (code: string) => void;
}

export default function CouponSection({ onApplyCoupon }: CouponSectionProps) {
    const [couponCode, setCouponCode] = useState("");

    const handleApply = () => {
        if (couponCode.trim()) {
            onApplyCoupon(couponCode.trim());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleApply();
        }
    };

    return (
        <div
            className="w-full bg-white rounded-lg border-2 border-light-gray-2 p-6"
            dir="rtl"
        >
            <div className="flex gap-3">
                <button
                    onClick={handleApply}
                    disabled={!couponCode.trim()}
                    className="px-6 py-3 bg-black text-white font-bold text-base rounded-lg hover:bg-dark-gray transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:shadow-none whitespace-nowrap"
                >
                    تطبيق
                </button>
                <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="ادخل كود الخصم الخاص بك"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-black text-right placeholder:text-light-gray-6"
                />
            </div>
        </div>
    );
}
