"use client";

import React from "react";
import Image from "next/image";
import { SupportAgent } from "@/types/tracking.types";

interface CustomerSupportCardProps {
    agent: SupportAgent;
}

export default function CustomerSupportCard({ agent }: CustomerSupportCardProps) {
    const handleWhatsAppClick = () => {
        window.open(`https://wa.me/${agent.whatsappNumber.replace(/\+/g, '')}`, '_blank');
    };

    const handlePhoneClick = () => {
        window.location.href = `tel:${agent.phoneNumber}`;
    };

    const handleSupportClick = () => {
        // Support action - could open a chat or modal
        console.log("Support clicked");
    };

    return (
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-center h-full relative overflow-visible p-4 sm:p-0" dir="rtl">
            {/* Right Side - Text and Buttons */}
            <div className="flex-1 flex flex-col items-center justify-center text-center sm:text-right p-2 sm:p-4 md:p-6 order-2 sm:order-1">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-[280px] mb-3 sm:mb-4">
                    عند حدوث أي تأخير أو ملاحظة على
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>
                    الشحنة، نأمل التواصل مع الموظف
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>
                    .المختص، فنحن هنا لراحتكم
                </p>
                <div className="flex gap-2 items-center justify-center">
                    <button
                        onClick={handlePhoneClick}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2E8B57] text-white flex items-center justify-center hover:opacity-90 transition"
                        aria-label="Phone"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                    </button>
                    <button
                        onClick={handleWhatsAppClick}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2E8B57] text-white flex items-center justify-center hover:opacity-90 transition"
                        aria-label="WhatsApp"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </button>
                    <button
                        onClick={handleSupportClick}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2E8B57] text-white flex items-center justify-center hover:opacity-90 transition"
                        aria-label="Support"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Vertical Divider - Hidden on mobile */}
            <div className="hidden sm:block h-16 md:h-24 w-[1px] bg-black dark:bg-white self-center order-2" />

            {/* Horizontal Divider - Visible on mobile only */}
            <div className="sm:hidden w-full border-t border-gray-200 dark:border-gray-700 my-3 order-3" />

            {/* Left Side - Agent Photo and Info */}
            <div className="flex-1 flex flex-row-reverse sm:flex-row items-center justify-center gap-3 sm:gap-5 p-2 sm:p-4 md:p-6 order-1 sm:order-3">
                <div className="flex flex-col items-center text-center min-w-[80px] sm:min-w-[100px] md:min-w-[120px]">
                    <h3 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-100 whitespace-nowrap">
                        {agent.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                        {agent.title}
                    </p>
                </div>

                <div className="relative">
                    <img
                        alt="Support Agent"
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full object-cover border-2 sm:border-4 border-white dark:border-gray-700 shadow-lg"
                        src={agent.image}
                    />
                </div>
            </div>
        </div>
    );
}
