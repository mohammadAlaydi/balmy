"use client";

import React, { useState } from "react";
import { TrackingFormByNumberData } from "@/types/tracking.types";

interface TrackingFormByNumberProps {
    onSubmit: (data: TrackingFormByNumberData) => void;
    isLoading?: boolean;
}

export default function TrackingFormByNumber({ onSubmit, isLoading = false }: TrackingFormByNumberProps) {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!trackingNumber.trim()) {
            setError("الرجاء إدخال رقم التتبع");
            return;
        }

        setError("");
        onSubmit({ trackingNumber: trackingNumber.trim() });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <label className="block text-xs sm:text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                رقم التتبع
            </label>

            <input
                type="text"
                value={trackingNumber}
                onChange={(e) => {
                    setTrackingNumber(e.target.value);
                    setError("");
                }}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition text-sm sm:text-base mb-4 sm:mb-6"
                placeholder=""
                disabled={isLoading}
            />

            {error && (
                <p className="text-red-500 text-sm mb-4 -mt-4">{error}</p>
            )}

            <div className="w-full flex justify-end mt-auto">
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
