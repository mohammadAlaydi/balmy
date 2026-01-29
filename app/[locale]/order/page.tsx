"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import OrderTypeSelector, {
    DeliveryType,
} from "@/components/order/OrderTypeSelector";
import ShippingForm, { ShippingFormData } from "@/components/order/ShippingForm";
import OrderSummary from "@/components/order/OrderSummary";
import CouponSection from "@/components/order/CouponSection";

export default function OrderPage() {
    const [selectedDeliveryType, setSelectedDeliveryType] =
        useState<DeliveryType>("home");

    const handleFormSubmit = (data: ShippingFormData) => {
        console.log("Form submitted:", data);
        console.log("Delivery type:", selectedDeliveryType);
        // TODO: Implement order submission logic
        alert("تم إرسال معلومات الشحن بنجاح!");
    };

    const handleApplyCoupon = (code: string) => {
        console.log("Applying coupon:", code);
        // TODO: Implement coupon validation logic
        alert(`تم تطبيق كود الخصم: ${code}`);
    };

    // Mock data - Replace with actual data from your backend/state
    const orderData = {
        subtotal: 1250,
        grandTotal: 1044,
    };

    const breadcrumbItems = [
        { label: "الرئيسية", href: "/" },
        { label: "السلة", href: "/cart" },
        { label: "معلومات الطلب" },
    ];

    return (
        <div className="min-h-screen bg-white" dir="rtl">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-8" />

                {/* Page Header */}
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-8 text-right">
                    معلومات الطلب
                </h1>

                {/* Order Type Selector */}
                <div className="mb-10">
                    <OrderTypeSelector
                        selectedType={selectedDeliveryType}
                        onTypeChange={setSelectedDeliveryType}
                    />
                </div>

                {/* Main Section */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Right Column: Shipping Form */}
                        <div className="lg:col-span-8">
                            <h2 className="text-2xl font-bold text-black mb-6 text-right">
                                عنوان الشحن
                            </h2>
                            <ShippingForm onSubmit={handleFormSubmit} />
                        </div>

                        {/* Left Column: Order Summary + Coupon */}
                        <div className="lg:col-span-4 space-y-6">
                            <OrderSummary
                                subtotal={orderData.subtotal}
                                grandTotal={orderData.grandTotal}
                            />
                            <CouponSection onApplyCoupon={handleApplyCoupon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
