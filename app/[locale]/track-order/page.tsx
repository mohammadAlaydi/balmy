"use client";

import React, { useState } from "react";
import OrderProgressBar from "@/components/tracking/OrderProgressBar";
import TrackingFormByNumber from "@/components/tracking/TrackingFormByNumber";
import TrackingFormByOrder from "@/components/tracking/TrackingFormByOrder";
import CustomerSupportCard from "@/components/tracking/CustomerSupportCard";
import MapView from "@/components/tracking/MapView";
import { OrderTrackingData, TrackingFormByNumberData, TrackingFormByOrderData } from "@/types/tracking.types";
import { fetchTrackingData, mockSupportAgent, getMockTrackingData } from "@/lib/mockTrackingData";

export default function TrackOrderPage() {
    // Initialize with mock data by default so components are visible immediately
    const [trackingData, setTrackingData] = useState<OrderTrackingData | null>(getMockTrackingData("TRACK123456"));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTrackByNumber = async (data: TrackingFormByNumberData) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await fetchTrackingData(data.trackingNumber, "trackingNumber");

            if (result) {
                setTrackingData(result);
            } else {
                setError("لم يتم العثور على رقم التتبع. الرجاء التحقق من الرقم والمحاولة مرة أخرى.");
            }
        } catch (err) {
            setError("حدث خطأ أثناء البحث. الرجاء المحاولة مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleTrackByOrder = async (data: TrackingFormByOrderData) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await fetchTrackingData(data.orderNumber, "orderWithContact");

            if (result) {
                setTrackingData(result);
            } else {
                setError("لم يتم العثور على الطلب. الرجاء التحقق من المعلومات والمحاولة مرة أخرى.");
            }
        } catch (err) {
            setError("حدث خطأ أثناء البحث. الرجاء المحاولة مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-body" dir="rtl">
            <main className="flex-grow container mx-auto px-4 py-12 lg:px-24">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-right mb-8">تابع طلبـــك</h1>

                {/* Tracking Forms Section */}
                <div className="bg-background-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-3xl p-8 lg:p-12 shadow-sm mb-16">
                    <div className="flex flex-col lg:flex-row gap-12 lg:divide-x lg:divide-x-reverse lg:divide-gray-200 dark:lg:divide-gray-700">
                        {/* Left Form - Track by Tracking Number */}
                        <div className="flex-1 lg:pl-12">
                            <TrackingFormByNumber onSubmit={handleTrackByNumber} isLoading={isLoading} />
                        </div>

                        {/* Right Form - Track by Order Number + Contact */}
                        <div className="flex-1 lg:pr-12">
                            <TrackingFormByOrder onSubmit={handleTrackByOrder} isLoading={isLoading} />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
                        </div>
                    )}
                </div>

                {/* Order Status Section - Only show when tracking data is available */}
                {trackingData && (
                    <>
                        {/* Progress Bar */}
                        <OrderProgressBar statusHistory={trackingData.statusHistory} />

                        {/* Bottom Grid - Support and Map */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-64">
                            {/* Customer Support Card */}
                            <CustomerSupportCard agent={mockSupportAgent} />

                            {/* Map View */}
                            <MapView location={trackingData.location} />
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
