"use client";

import React, { useState } from "react";
import { TrackingFormByOrderData } from "@/types/tracking.types";

interface TrackingFormByOrderProps {
    onSubmit: (data: TrackingFormByOrderData) => void;
    isLoading?: boolean;
}

export default function TrackingFormByOrder({ onSubmit, isLoading = false }: TrackingFormByOrderProps) {
    const [orderNumber, setOrderNumber] = useState("");
    const [contact, setContact] = useState("");
    const [errors, setErrors] = useState({ orderNumber: "", contact: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors = { orderNumber: "", contact: "" };
        let hasError = false;

        if (!orderNumber.trim()) {
            newErrors.orderNumber = "الرجاء إدخال رقم الطلب";
            hasError = true;
        }

        if (!contact.trim()) {
            newErrors.contact = "الرجاء إدخال رقم التليفون أو البريد الالكتروني";
            hasError = true;
        }

        setErrors(newErrors);

        if (!hasError) {
            onSubmit({
                orderNumber: orderNumber.trim(),
                contact: contact.trim()
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:space-y-6">
            <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                    رقم الطلـــب
                </label>
                <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => {
                        setOrderNumber(e.target.value);
                        setErrors(prev => ({ ...prev, orderNumber: "" }));
                    }}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition text-sm sm:text-base"
                    placeholder=""
                    disabled={isLoading}
                />
                {errors.orderNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.orderNumber}</p>
                )}
            </div>

            <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                    رقم التليفون أو البريد الالكتروني
                </label>
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => {
                        setContact(e.target.value);
                        setErrors(prev => ({ ...prev, contact: "" }));
                    }}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition text-sm sm:text-base"
                    placeholder=""
                    disabled={isLoading}
                />
                {errors.contact && (
                    <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition w-28 sm:w-32 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "جاري البحث..." : "متابعـــة"}
                </button>
            </div>
        </form>
    );
}
