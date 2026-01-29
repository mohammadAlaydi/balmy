"use client";

import Image from "next/image";

export default function PaymentInstallmentBanner() {
    return (
        <div className="w-full flex justify-center px-4 my-8 md:my-16">
            <div
                className="w-full max-w-[1707px] min-h-[200px] md:h-[279px] bg-white border border-[#EA3A3A] rounded-[30px] md:rounded-[62px] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 md:py-0 gap-6 shadow-sm"
                dir="rtl"
            >
                {/* Right Side - Logos (In RTL this appears on the Right) */}
                <div className="flex items-center gap-6 md:gap-12">
                    {/* Tamara Logo - Black Arabic Script */}
                    <div className="relative h-12 md:h-16 w-32 md:w-44">
                        <Image
                            src="/assets/images/tamara.png"
                            alt="Tamara"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Tabby Logo - Green Button */}
                    <div className="relative h-12 md:h-20 w-32 md:w-44">
                        <Image
                            src="/assets/images/tabby-badge.png"
                            alt="Tabby"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Left Side - Dark Capsule (In RTL this appears on the Left) */}
                <div className="bg-black text-white rounded-[40px] md:rounded-[100px] px-8 py-4 md:px-20 md:py-8 flex flex-col items-center justify-center text-center min-w-[300px] md:min-w-[500px]">
                    <span className="font-bold text-lg md:text-3xl mb-2 font-sans tracking-wide">
                        قسط مشترياتك على 4 دفعات
                    </span>
                    <span className="text-sm md:text-xl font-light text-gray-200">
                        من غير رسوم او غرامات
                    </span>
                </div>
            </div>
        </div>
    );
}
