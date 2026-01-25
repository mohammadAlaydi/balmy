"use client";

import ShippingForm, { ShippingFormData } from "./ShippingForm";
import CheckoutSidebar from "./CheckoutSidebar";

export interface ShippingSectionProps {
    subtotal: number;
    grandTotal: number;
    onSubmit: (data: ShippingFormData) => void;
    onApplyCoupon: (code: string) => void;
}

export default function ShippingSection({
    subtotal,
    grandTotal,
    onSubmit,
    onApplyCoupon,
}: ShippingSectionProps) {
    return (
        <div
            className="rounded-2xl border border-gray-200 bg-white p-8"
            dir="rtl"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Right Column: Shipping Form (Takes 8 columns) */}
                <div className="lg:col-span-8">
                    <h2 className="text-2xl font-bold text-black mb-6 text-right">
                        عنوان الشحن
                    </h2>
                    <ShippingForm onSubmit={onSubmit} />
                </div>

                {/* Left Column: Checkout Sidebar (Takes 4 columns) */}
                <div className="lg:col-span-4">
                    <CheckoutSidebar
                        subtotal={subtotal}
                        grandTotal={grandTotal}
                        onApplyCoupon={onApplyCoupon}
                    />
                </div>
            </div>
        </div>
    );
}
