"use client";

import Image from "next/image";

const BRANDS = [
    { name: "Rolex", image: "/assets/images/18975-rolex-logo.png" },
    { name: "Dior", image: "/assets/images/Dior-Logo.jpg" },
    { name: "Versace", image: "/assets/images/Versace.png" },
    { name: "Emporia", image: "/assets/images/emporia-state-university.jpg" },
    { name: "Brand", image: "/assets/images/images.png" },
];

export default function BrandsShowcaseSection() {
    return (
        <div className="w-full flex justify-center px-4 my-8 md:my-16">
            <div
                className="w-full max-w-[1707px] min-h-[300px] md:h-[501px] bg-white border border-[#707070] rounded-[35px] flex flex-col items-center justify-center p-8 gap-8 md:gap-16"
            >
                {/* Text Content */}
                <div className="text-center flex flex-col gap-4">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                        وجهتك الأولى للعطور العالمية الأصلية
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-normal mt-2">
                        الماركات العالمية الأكثر مبيعاً في السعودية
                    </p>
                </div>

                {/* Logos Row */}
                <div className="w-full flex flex-wrap md:flex-nowrap justify-center md:justify-around items-center gap-8 md:gap-12 px-4 md:px-12">
                    {BRANDS.map((brand, index) => (
                        <div
                            key={index}
                            className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                        >
                            <Image
                                src={brand.image}
                                alt={brand.name}
                                fill
                                className="object-contain mix-blend-multiply"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
