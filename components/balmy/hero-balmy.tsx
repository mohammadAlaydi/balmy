"use client";

import Image from "next/image";
import TrackOrderButtonBalmy from "./track-order-button-balmy";


export type HeroBalmyProps = {
    sliders?: any[];
};

export default function HeroBalmy({ sliders }: HeroBalmyProps) {
    // Use the first slider image or fallback to default
    const heroImage = sliders?.[0]?.slider_path || sliders?.[0]?.image || "/images/bg.jpg";

    return (
        <section
            className="relative w-full h-[500px] md:h-[700px] lg:h-[900px] opacity-100 overflow-hidden -mt-[54px] md:-mt-[54px]"
        >
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={heroImage}
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover object-center"
                    quality={90}
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Track Order Button */}
            <TrackOrderButtonBalmy />

            {/* Hero content container - centered with max-width */}
            <div className="relative z-10 h-full w-full max-w-[1920px] mx-auto pt-[54px]">
                <div className="h-full flex flex-col items-center justify-center px-4">
                    {/* Hero Title - Optional */}
                    <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4 drop-shadow-lg">
                        {sliders?.[0]?.title || ""}
                    </h1>
                    {/* Hero Subtitle - Optional */}
                    <p className="text-white/90 text-lg md:text-xl lg:text-2xl text-center max-w-2xl drop-shadow-md">
                        {sliders?.[0]?.subtitle || ""}
                    </p>
                </div>
            </div>
        </section>
    );
}

