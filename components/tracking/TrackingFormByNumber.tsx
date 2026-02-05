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
            <label className="block text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                رقم التتبع
            </label>

            <input
                type="text"
                value={trackingNumber}
                onChange={(e) => {
                    setTrackingNumber(e.target.value);
                    setError("");
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent outline-none transition mb-6"
                placeholder=""
                disabled={isLoading}
            />

            {error && (
                <p className="text-red-500 text-sm mb-4 -mt-4">{error}</p>
            )}

            <div className="mt-auto w-full flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary-hover text-white px-8 py-2.5 rounded-lg text-sm font-medium transition w-32 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "جاري البحث..." : "متابعة"}
                </button>
            </div>
        </form>
    );
}
