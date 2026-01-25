"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export interface CheckoutSidebarProps {
    subtotal: number;
    grandTotal: number;
    isAddressValid?: boolean;
    onApplyCoupon: (code: string) => void;
}

export default function CheckoutSidebar({
    subtotal,
    grandTotal,
    isAddressValid = false,
    onApplyCoupon,
}: CheckoutSidebarProps) {
    const formatPrice = (price: number) => {
        return price.toLocaleString("ar-SA");
    };

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
        <div className="space-y-6" dir="rtl">
            {/* Widget 1: Payment Method Placeholder */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-black text-right">
                    طريقة الدفع
                </h3>
                <div className="flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-8">
                    <p className="text-center text-sm text-gray-500">
                        {isAddressValid
                            ? "يمكنك الآن اختيار طريقة الدفع"
                            : "الرجاء اختيار عنوان الشحن"}
                    </p>
                </div>
            </div>

            {/* Widget 2: Order Summary */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="space-y-4">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <span className="text-base text-gray-600">المجموع</span>
                        <span className="text-lg font-semibold text-black">
                            {formatPrice(subtotal)}{" "}
                            <span className="text-sm font-normal">ريال</span>
                        </span>
                    </div>

                    {/* Grand Total */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                            <span className="text-lg font-bold text-black">
                                المجموع الكلي
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-black">
                                    {formatPrice(grandTotal)}
                                </span>
                                <span className="text-base font-semibold text-black">ريال</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 text-right">
                            السعر شامل الضرائب
                        </p>
                    </div>
                </div>
            </div>

            {/* Widget 3: Coupon Input */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex gap-3">
                    <button
                        onClick={handleApply}
                        disabled={!couponCode.trim()}
                        className="px-6 h-12 bg-black text-white font-bold text-base rounded-md hover:bg-gray-800 transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:shadow-none whitespace-nowrap"
                    >
                        تطبيق
                    </button>
                    <Input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="ادخل كود الخصم الخاص بك"
                        className="flex-1 h-12 text-right border-gray-300 placeholder:text-gray-400"
                        dir="rtl"
                    />
                </div>
            </div>
        </div>
    );
}
