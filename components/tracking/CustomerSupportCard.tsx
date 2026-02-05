"use client";

import React from "react";
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

    return (
        <div className="bg-background-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-3xl p-6 flex items-center justify-between shadow-sm h-full">
            {/* Right Side - Text and Buttons */}
            <div className="text-right flex flex-col items-start">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-right w-48 leading-relaxed">
                    عند حدوث أي تأخير أو ملاحظة على الشحنة، نأمل التواصل مع الموظف المختص، فنحن هنا لراحتكم
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={handleWhatsAppClick}
                        className="w-8 h-8 rounded-full bg-accent-green text-white flex items-center justify-center hover:opacity-90 transition"
                        aria-label="WhatsApp"
                    >
                        <i className="fab fa-whatsapp"></i>
                    </button>
                    <button
                        onClick={handlePhoneClick}
                        className="w-8 h-8 rounded-full bg-accent-green text-white flex items-center justify-center hover:opacity-90 transition"
                        aria-label="Phone"
                    >
                        <i className="fas fa-phone"></i>
                    </button>
                </div>
            </div>

            {/* Left Side - Agent Info and Image */}
            <div className="flex items-center gap-6">
                <div className="border-l border-gray-200 dark:border-gray-600 pl-6 h-16 flex flex-col justify-center">
                    <h3 className="font-bold text-lg mb-1">{agent.name}</h3>
                    <p className="text-gray-500 text-sm">{agent.title}</p>
                </div>
                <div className="relative">
                    <img
                        alt="Support Agent"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-gray-600 shadow-md"
                        src={agent.image}
                    />
                    {agent.isOnline && (
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                </div>
            </div>
        </div>
    );
}
