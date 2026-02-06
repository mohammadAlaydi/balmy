"use client";

import React, { useState } from "react";
import OrderProgressBar from "@/components/tracking/OrderProgressBar";
import OrderTrackingStepper from "@/components/tracking/OrderTrackingStepper";
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
            <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 md:py-12 lg:px-24">
                {/* Page Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-right mb-6 sm:mb-8">تابع طلبـــك</h1>

                {/* Tracking Forms Section */}
                <div className="bg-background-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-sm mb-8 sm:mb-12 md:mb-16">
                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 lg:divide-x lg:divide-x-reverse lg:divide-gray-200 dark:lg:divide-gray-700">
                        {/* Left Form - Track by Tracking Number */}
                        <div className="flex-1 lg:pl-8 xl:pl-12">
                            <TrackingFormByNumber onSubmit={handleTrackByNumber} isLoading={isLoading} />
                        </div>

                        {/* Mobile Divider */}
                        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700" />

                        {/* Right Form - Track by Order Number + Contact */}
                        <div className="flex-1 lg:pr-8 xl:pr-12">
                            <TrackingFormByOrder onSubmit={handleTrackByOrder} isLoading={isLoading} />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-red-600 dark:text-red-400 text-center text-sm sm:text-base">{error}</p>
                        </div>
                    )}
                </div>

                {/* Order Status Section - Only show when tracking data is available */}
                {trackingData && (
                    <>
                        {/* Progress Bar - Using Dynamic Stepper with Actual Data */}
                        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                            <OrderTrackingStepper statusHistory={trackingData.statusHistory} />
                        </div>

                        {/* Bottom Grid - Support and Map */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                            {/* Map View */}
                            <div className="h-48 sm:h-56 md:h-64 lg:h-64 order-1 lg:order-1">
                                <MapView destination={trackingData.location} />
                            </div>

                            {/* Customer Support Card */}
                            <div className="min-h-[180px] sm:min-h-[200px] md:min-h-[256px] order-2 lg:order-2">
                                <CustomerSupportCard agent={mockSupportAgent} />
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
