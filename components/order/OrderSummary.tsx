"use client";

export interface OrderSummaryProps {
    subtotal: number;
    grandTotal: number;
}

export default function OrderSummary({
    subtotal,
    grandTotal,
}: OrderSummaryProps) {
    const formatPrice = (price: number) => {
        return price.toLocaleString("ar-SA");
    };

    return (
        <div
            className="w-full bg-white rounded-lg border-2 border-light-gray-2 p-6"
            dir="rtl"
        >
            <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center pb-4 border-b border-light-gray-2">
                    <span className="text-base text-medium-gray">المجموع</span>
                    <span className="text-lg font-semibold text-black">
                        {formatPrice(subtotal)}{" "}
                        <span className="text-sm font-normal">ريال</span>
                    </span>
                </div>

                {/* Grand Total */}
                <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                        <span className="text-lg font-bold text-black">المجموع الكلي</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-black">
                                {formatPrice(grandTotal)}
                            </span>
                            <span className="text-base font-semibold text-black">ريال</span>
                        </div>
                    </div>
                    <p className="text-xs text-medium-gray text-right">
                        السعر شامل الضرائب
                    </p>
                </div>
            </div>
        </div>
    );
}
