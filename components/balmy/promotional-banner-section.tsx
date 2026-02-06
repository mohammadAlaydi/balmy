"use client";

import React from "react";

interface AdData {
    url?: string;
    link?: string;
    position?: number;
    id?: number;
}

interface PromotionalBannerSectionProps {
    ad?: AdData;
}

export default function PromotionalBannerSection({ ad }: PromotionalBannerSectionProps) {
    // Use ad image from backend or fallback to static image
    const backgroundImage = ad?.url || '/assets/images/vecteezy_gold-silk-fabric-background_49939843.jpg';

    return (
        // The outer div handles vertical spacing
        <div className="relative w-full my-8 md:my-24">
            {/* 
                Break out of the parent container to achieve full viewport width (100vw).
                Using left: 50% and -translate-x-1/2 centers it relative to the viewport.
            */}
            <div
                className="absolute left-1/2 -translate-x-1/2 w-screen h-[400px] md:h-[600px] lg:h-[829px] overflow-hidden"
                style={{
                    maxWidth: '100vw' // Prevent horizontal scrollbar
                }}
            >
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300 shadow-xl"
                    style={{
                        backgroundImage: `url('${backgroundImage}')`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/5" />
                </div>
            </div>
            {/* Spacer to preserve height in the flow since the banner is absolute */}
            <div className="h-[400px] md:h-[600px] lg:h-[829px] w-full invisible"></div>
        </div>
    );
}

