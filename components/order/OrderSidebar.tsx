"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function OrderSidebar() {
    return (
        <div className="flex flex-col gap-6">
            {/* Payment Method Placeholder */}
            <div>
                <h4 className="font-bold mb-3 text-right">طريقة الدفع</h4>
                <div className="relative">
                    <input
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-lg py-3 px-4 text-sm text-gray-500 cursor-not-allowed"
                        disabled
                        placeholder="الرجاء اختيار عنوان الشحن"
                        type="text"
                        dir="rtl"
                    />
                </div>
            </div>

            {/* Order Summary Box */}
            <div className="border border-border-light dark:border-border-dark rounded-lg p-5 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-right">
                        <span className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                            المجموع
                        </span>
                        <span className="block text-xs text-gray-400">رسوم الشحن</span>
                    </div>
                    <div className="flex items-center font-bold text-xl text-black dark:text-white">
                        <span className="text-sm ml-1">ر.س</span>
                        <span>1,250</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-right">
                        <span className="block text-sm font-bold text-gray-700 dark:text-gray-200">
                            المجموع الكلي
                        </span>
                        <span className="block text-xs text-gray-400">
                            السعر شامل الضرائب
                        </span>
                    </div>
                    <div className="flex items-center font-bold text-xl text-black dark:text-white">
                        <span className="text-sm ml-1">ر.س</span>
                        <span>1,044</span>
                    </div>
                </div>
            </div>

            {/* Coupon Input */}
            <div className="flex gap-2">
                <input
                    className="flex-1 border border-border-light dark:border-border-dark rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 focus:ring-black dark:focus:ring-gray-500 focus:border-black text-right min-h-[44px]"
                    placeholder="ادخل كود الخصم الخاص بك"
                    type="text"
                    dir="rtl"
                />
                <button className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition min-w-[80px]">
                    تطبيق
                </button>
            </div>
        </div>
    );
}
