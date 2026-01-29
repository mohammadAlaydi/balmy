"use client";

import React from "react";

export default function PromotionalBannerSection() {
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
                        backgroundImage: "url('/assets/images/vecteezy_gold-silk-fabric-background_49939843.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/5" />

                    <div className="h-full w-full max-w-[1707px] mx-auto flex items-center pr-4 md:pr-[100px]" dir="ltr">
                        <div className="flex h-full items-center justify-start pl-8 md:pl-[100px]">
                            <span className="text-white font-[100] text-[80px] sm:text-[120px] md:text-[250px] lg:text-[300px] leading-none font-sans select-none drop-shadow-2xl">
                                50%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Spacer to preserve height in the flow since the banner is absolute */}
            <div className="h-[400px] md:h-[600px] lg:h-[829px] w-full invisible"></div>
        </div>
    );
}
