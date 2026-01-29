"use client";

import React from "react";

export default function PromotionalBannerSection() {
    return (
        <div className="w-full flex justify-center px-4 my-8 md:my-16">
            <div
                className="relative w-full max-w-[1707px] h-[400px] md:h-[600px] lg:h-[726px] border border-white rounded-[30px] md:rounded-[60px] overflow-hidden bg-cover bg-center bg-no-repeat shadow-lg"
                style={{ backgroundImage: "url('/assets/images/ai-generated-luxury-perfume-cosmetic-premium-glass-bottle-banner-poster-for-beauty-promotion-of-elegant-product-for-ads-on-draped-silk-fabric-clothing-elegants-landscape.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/10" /> {/* Optional overlay for text contrast if needed */}

                <div className="h-full w-full flex items-center justify-end md:justify-end pr-8 md:pr-[100px]" dir="ltr">
                    {/* 
                Note: The user asked for "Left side" alignment. 
                In LTR, justify-start is left. 
                In RTL context (which the site usually is), we need to be careful.
                The user said "Align the text to the left side... Add significant left padding".
                So regardless of direction, visually it should be on the left.
             */}

                    <div className="flex h-full items-center justify-start absolute inset-0 pl-8 md:pl-[100px]">
                        <span className="text-white font-[100] text-[120px] md:text-[200px] lg:text-[300px] leading-none font-sans select-none drop-shadow-sm">
                            50%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
