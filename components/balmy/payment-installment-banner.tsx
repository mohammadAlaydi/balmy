"use client";

import Image from "next/image";

export default function PaymentInstallmentBanner() {
    return (
        <div className="w-full flex justify-center px-2 sm:px-4 my-6 md:my-12 lg:my-16" dir="rtl">
            {/* Main Container */}
            <div
                className="relative w-full max-w-[1707px] bg-white border border-[#3A3A3A] rounded-[32px] sm:rounded-[48px] lg:rounded-[62px] flex flex-col lg:flex-row items-center overflow-hidden"
            >
                {/* Right Side: Logos Group (Start in RTL) */}
                <div className="flex-1 w-full flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 p-6 sm:p-8 md:p-10 lg:p-12">

                    {/* Tabby Logo */}
                    <div
                        className="flex items-center justify-center rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[48px] w-full sm:w-auto"
                        style={{
                            maxWidth: '360px',
                            width: '100%',
                            minWidth: '200px',
                            aspectRatio: '360/148',
                            backgroundColor: '#5AFEAE',
                        }}
                    >
                        <div className="relative w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-[56px] sm:h-[64px] md:h-[72px] lg:h-[80px]">
                            <Image
                                src="/assets/images/tabby.png"
                                alt="Tabby"
                                fill
                                className="object-contain mix-blend-multiply"
                            />
                        </div>
                    </div>

                    {/* Tamara Logo */}
                    <div
                        className="flex items-center justify-center rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[48px] w-full sm:w-auto"
                        style={{
                            maxWidth: '360px',
                            width: '100%',
                            minWidth: '200px',
                            aspectRatio: '360/105',
                            backgroundColor: '#16181D',
                        }}
                    >
                        <div className="relative w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-[42px] sm:h-[48px] md:h-[54px] lg:h-[60px]">
                            <Image
                                src="/assets/images/tamara.png"
                                alt="Tamara"
                                fill
                                className="object-contain invert"
                            />
                        </div>
                    </div>
                </div>


                {/* Left Side: Black Capsule (End in RTL) */}
                <div
                    className="flex flex-col items-center justify-center text-center w-full lg:w-auto lg:shrink-0 py-8 sm:py-10 md:py-12 lg:py-0 px-4 sm:px-6 md:px-8 bg-black lg:rounded-r-[32px] xl:rounded-r-[48px] 2xl:rounded-r-[62px]"
                    style={{
                        minHeight: '200px',
                    }}
                >
                    <span
                        className="font-bold text-white font-cairo text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[45px] leading-tight sm:leading-snug md:leading-normal px-2"
                        style={{
                            lineHeight: '1.4',
                        }}
                    >
                        قسط مشترياتك على 4 دفعات
                    </span>
                    <span className="text-base sm:text-lg md:text-xl font-light text-gray-200 mt-2 sm:mt-3">
                        من غير رسوم او غرامات
                    </span>
                </div>

            </div>
        </div>
    );
}