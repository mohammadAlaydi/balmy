"use client";

import React from "react";
import Image from "next/image";
import { FaShieldHalved, FaCertificate, FaMedal, FaTruckFast } from "react-icons/fa6";

interface PromotionItem {
    id?: string;
    icon?: string;
    title: string;
    description?: string;
    subtitle?: string;
}

interface PromotionsData {
    title?: string;
    subtitle?: string;
    items?: PromotionItem[];
}

interface TrustFeaturesSectionProps {
    promotions?: PromotionsData;
}

// Icon mapping from string names to React components
const ICON_MAP: Record<string, any> = {
    'shield-check': FaShieldHalved,
    'badge-check': FaCertificate,
    'thumbs-up': FaMedal,
    'truck': FaTruckFast,
};

const DEFAULT_FEATURES = [
    {
        icon: FaShieldHalved,
        title: "آمن ومضمون",
        subtitle: null,
    },
    {
        icon: FaCertificate,
        title: "أصلي 100%",
        subtitle: null,
    },
    {
        icon: FaMedal,
        title: "رضاكم مضمون",
        subtitle: null,
    },
    {
        icon: FaTruckFast,
        title: "شحن مجاني",
        subtitle: "للطلبات التي تزيد قيمتها عن 299 ريال",
    },
];

const PARTNERS = [
    { name: "Visa", src: "/assets/images/partners/visa.svg" },
    { name: "Mastercard", src: "/assets/images/partners/mastercard.svg" },
    { name: "Mada", src: "/assets/images/partners/mada_gen.svg" },
    { name: "Apple Pay", src: "/assets/images/partners/apple-pay.svg" },
    { name: "Tamara", src: "/assets/images/tamara.png" },
    { name: "Tabby", src: "/assets/images/tabby.png" },
    { name: "Aramex", src: "/assets/images/partners/aramex_gen.svg" },
];

export default function TrustFeaturesSection({ promotions }: TrustFeaturesSectionProps) {
    // Build features from API promotions data or use defaults
    const features = promotions?.items && promotions.items.length > 0
        ? promotions.items.map((item: PromotionItem, idx: number) => ({
            icon: ICON_MAP[item.icon || ''] || DEFAULT_FEATURES[idx]?.icon || FaShieldHalved,
            title: item.title,
            subtitle: item.description || null,
        }))
        : DEFAULT_FEATURES;

    const sectionTitle = promotions?.title || "فروعنا في المملكة لأكثر من 30 عام";
    const sectionSubtitle = promotions?.subtitle || "نفخر بخدمة أكثر من مليون عميل";

    return (
        <div className="w-full flex flex-col items-center px-4 my-8 md:my-16 gap-8">

            {/* 1. Trust & Features Banner */}
            <div
                className="w-full max-w-[1707px] min-h-[487px] bg-[#1A1A1A] rounded-[50px] flex flex-col items-center justify-center p-8 md:p-16 text-center gap-12"
            >
                {/* Headings */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold">
                        {sectionTitle}
                    </h2>
                    <p className="text-gray-400 text-lg md:text-2xl lg:text-3xl font-normal">
                        {sectionSubtitle}
                    </p>
                </div>

                {/* Features Grid */}
                <div
                    className="w-full flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 md:gap-0"
                    dir="rtl"
                >
                    {features.map((feature: any, index: number) => (
                        <div key={index} className="flex items-center">
                            {/* Feature Item */}
                            <div className="flex flex-col items-center gap-4 px-8 lg:px-16">
                                {/* Icons - Updated size and stroke */}
                                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-white mb-2">
                                    {/* fill-white ensures the icon is filled, not just stroked */}
                                    <feature.icon className="w-full h-full fill-white" />
                                </div>
                                <h3 className="text-white text-xl md:text-2xl font-bold whitespace-nowrap">
                                    {feature.title}
                                </h3>
                                {feature.subtitle && (
                                    <p className="text-gray-400 text-xs md:text-sm max-w-[200px]">
                                        {feature.subtitle}
                                    </p>
                                )}
                            </div>

                            {/* Separator - Only between items (not after the last one) */}
                            {index < features.length - 1 && (
                                <div className="hidden md:block w-px h-24 bg-white/20" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Payment Partners Strip */}
            <div className="w-full max-w-[1707px] flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-10 py-4">
                {PARTNERS.map((partner, index) => (
                    <div
                        key={index}
                        className="relative h-10 md:h-12 lg:h-16 w-auto min-w-[70px] flex items-center justify-center"
                    >
                        {/* Using Next.js Image with object-contain to manage height strictly */}
                        <Image
                            src={partner.src}
                            alt={partner.name}
                            height={64}
                            width={140}
                            className="h-full w-auto object-contain"
                            onError={(e) => {
                                // Fallback if image fails (especially for the ones that might be broken)
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerText = partner.name;
                            }}
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}
