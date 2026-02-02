"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import OrderTypeSelector, {
    DeliveryType,
} from "@/components/order/OrderTypeSelector";
import ShippingForm, { ShippingFormData } from "@/components/order/ShippingForm";
import OrderSidebar from "@/components/order/OrderSidebar";

export default function OrderPage() {
    const [selectedDeliveryType, setSelectedDeliveryType] =
        useState<DeliveryType>("home");

    const handleFormSubmit = (data: ShippingFormData) => {
        console.log("Form submitted:", data);
        console.log("Delivery type:", selectedDeliveryType);
        // TODO: Implement order submission logic
        alert("تم إرسال معلومات الشحن بنجاح!");
    };

    const breadcrumbItems = [
        { label: "الرئيسية", href: "/" },
        { label: "معلومات الطلب" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark text-gray-800 dark:text-gray-100 transition-colors duration-200" dir="rtl">
            <main className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <Breadcrumb items={breadcrumbItems} />
                </div>

                <h2 className="text-xl font-bold mb-6 text-right text-black dark:text-white">معلومات الطلب</h2>

                <OrderTypeSelector
                    selectedType={selectedDeliveryType}
                    onTypeChange={setSelectedDeliveryType}
                />

                <div className="border border-gray-300 dark:border-gray-600 rounded-xl p-6 lg:p-8 bg-white dark:bg-surface-dark">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-black dark:text-white">عنوان الشحن</h3>
                        <span className="text-xs text-gray-400">الرجاء اختيار طريقة التوصيل</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Sidebar (Summary) - Order 2 on desktop (Left side in RTL) */}
                        <div className="lg:col-span-4 order-2 lg:order-2">
                            <OrderSidebar />
                        </div>

                        {/* Main Form - Order 1 on desktop (Right side in RTL) */}
                        <div className="lg:col-span-8 order-1 lg:order-1">
                            <ShippingForm onSubmit={handleFormSubmit} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
