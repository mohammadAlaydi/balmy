"use client";

import React from "react";
import Image from "next/image";
import { FaShieldHalved, FaCertificate, FaMedal, FaTruckFast } from "react-icons/fa6";

const FEATURES = [
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

export default function TrustFeaturesSection() {
    return (
        <div className="w-full flex flex-col items-center px-4 my-8 md:my-16 gap-8">

            {/* 1. Trust & Features Banner */}
            <div
                className="w-full max-w-[1707px] min-h-[487px] bg-[#1A1A1A] rounded-[50px] flex flex-col items-center justify-center p-8 md:p-16 text-center gap-12"
            >
                {/* Headings */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold">
                        فروعنا في المملكة لأكثر من 30 عام
                    </h2>
                    <p className="text-gray-400 text-lg md:text-2xl lg:text-3xl font-normal">
                        نفخر بخدمة أكثر من مليون عميل
                    </p>
                </div>

                {/* Features Grid */}
                <div
                    className="w-full flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 md:gap-0"
                    dir="rtl"
                >
                    {FEATURES.map((feature, index) => (
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
                            {index < FEATURES.length - 1 && (
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
