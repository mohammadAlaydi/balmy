"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Truck, Clock, MapPin } from "lucide-react";

interface DeliveryInfoBalmyProps {
    estimatedDays?: string;
    deliveryOptions?: string;
    deliveryNotice?: string;
    className?: string;
}

export default function DeliveryInfoBalmy({
    estimatedDays = "3-5",
    deliveryOptions,
    deliveryNotice,
    className,
}: DeliveryInfoBalmyProps) {
    const t = useTranslations("product-details");

    return (
        <div className={cn("flex flex-col gap-3", className)} dir="rtl">
            {/* Payment Bar 1 - Tamara Style */}
            <div className="flex items-center justify-between w-full p-2 border border-[#707070] rounded-[10px]">
                <div className="flex items-center justify-between w-full gap-2">
                    <span className="text-[12px] leading-[23px] text-black font-cairo whitespace-nowrap overflow-hidden text-ellipsis">
                        ادفع 21.28 /شهريًا أو على 4 دفعات. متوافقة مع الشريعة الإسلامية. <span className="underline cursor-pointer">تعرّف على خياراتك</span>
                    </span>
                    <img src="/assets/images/tamara.png" alt="Tamara" className="h-6 object-contain min-w-[50px]" />
                </div>
            </div>

            {/* Payment Bar 2 - Tabby Style */}
            <div className="flex items-center justify-between w-full p-2 border border-[#707070] rounded-[10px]">
                <div className="flex items-center justify-between w-full gap-2">
                    <span className="text-[12px] leading-[23px] text-black font-cairo whitespace-nowrap text-ellipsis overflow-hidden">
                        قسمّها على 4 دفعات بقيمة 54.38 بدون فوائد. متوافق مع أحكام الشريعة. <span className="underline cursor-pointer">لمعرفة المزيد</span>
                    </span>
                    <img src="/assets/images/tabby.png" alt="Tabby" className="h-4 object-contain min-w-[40px]" />
                </div>
            </div>

            {/* Delivery Notice - Dark Gray Box */}
            <div className="flex items-center gap-3 p-4 bg-[var(--color-dark-gray-3)] rounded-lg">
                <Truck className="w-5 h-5 text-white flex-shrink-0" />
                <p className="text-sm text-white font-cairo">
                    {deliveryNotice || t("delivery-notice") || "توصيــل سريــــع في نجــــــران خــــلال 3 ساعـــــات"}
                </p>
            </div>
        </div>
    );
}
