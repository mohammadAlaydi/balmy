"use client";

import Image from "next/image";

export default function PaymentInstallmentBanner() {
    return (
        <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 my-6 md:my-12 lg:my-16" dir="rtl">
            {/* Main Container */}
            <div
                className="relative w-full max-w-[1200px] bg-white border border-[#3A3A3A] rounded-[32px] sm:rounded-[48px] lg:rounded-[62px] flex flex-col lg:flex-row items-center overflow-hidden"
            >
                {/* Black Capsule - First on mobile (top), End on desktop (left in RTL) */}
                <div
                    className="w-full lg:w-auto flex flex-col items-center justify-center text-center shrink-0 py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-8 bg-black rounded-t-[32px] sm:rounded-t-[48px] lg:rounded-t-none lg:rounded-r-[32px] xl:rounded-r-[48px] 2xl:rounded-r-[62px] lg:self-stretch order-first lg:order-last"
                    style={{ maxWidth: '100%' }}
                >
                    <span
                        className="font-bold text-white font-cairo text-[18px] sm:text-[20px] md:text-[22px] lg:text-[22px] xl:text-[26px] 2xl:text-[30px] leading-snug"
                    >
                        قسط مشترياتك على 4 دفعات
                    </span>
                    <span className="text-sm sm:text-base lg:text-base font-light text-gray-200 mt-1 sm:mt-2">
                        من غير رسوم او غرامات
                    </span>
                </div>

                {/* Logos Group */}
                <div className="flex-1 w-full flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-16 2xl:gap-20 p-4 sm:p-6 md:p-8 lg:p-6 xl:p-10 2xl:p-12">

                    {/* Tabby Logo */}
                    <div
                        className="flex items-center justify-center rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[36px] xl:rounded-[48px] w-full sm:w-auto flex-shrink-0"
                        style={{
                            maxWidth: '280px',
                            width: '100%',
                            minWidth: '160px',
                            aspectRatio: '360/148',
                            backgroundColor: '#5AFEAE',
                        }}
                    >
                        <div className="relative w-[120px] sm:w-[140px] md:w-[160px] lg:w-[140px] xl:w-[180px] 2xl:w-[200px] h-[48px] sm:h-[56px] md:h-[64px] lg:h-[56px] xl:h-[72px] 2xl:h-[80px]">
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
                        className="flex items-center justify-center rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[36px] xl:rounded-[48px] w-full sm:w-auto flex-shrink-0"
                        style={{
                            maxWidth: '280px',
                            width: '100%',
                            minWidth: '160px',
                            aspectRatio: '360/105',
                            backgroundColor: '#16181D',
                        }}
                    >
                        <div className="relative w-[120px] sm:w-[140px] md:w-[160px] lg:w-[140px] xl:w-[180px] 2xl:w-[200px] h-[36px] sm:h-[42px] md:h-[48px] lg:h-[42px] xl:h-[54px] 2xl:h-[60px]">
                            <Image
                                src="/assets/images/tamara.png"
                                alt="Tamara"
                                fill
                                className="object-contain invert"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}