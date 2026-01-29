"use client";

import Image from "next/image";

export default function PaymentInstallmentBanner() {
    return (
        <div className="w-full flex justify-center px-4 my-8 md:my-16">
            {/* Main Container */}
            <div
                className="relative w-full max-w-[1707px] min-h-[279px] bg-white border border-[#3A3A3A] rounded-[62px] flex items-center overflow-hidden"
                style={{
                    height: '279px',
                }}
                dir="rtl"
            >
                {/* 
                   Layout Requirement:
                   - Main container: 1707px wide, 279px high, White bg, Dark border.
                   - Left Black Capsule: 662px wide, 279px high.
                   - Logos on the right side.
                   
                   RTL: 
                   - Right side = Start
                   - Left side = End
                   
                   So the black capsule should be at the "Left" (End in RTL).
                   Logos should be at the "Right" (Start in RTL).
                */}

                {/* Right Side: Logos Group (Start in RTL) */}
                <div className="flex-1 flex justify-center items-center gap-[60px] md:gap-[100px] h-full">

                    {/* Tabby Logo - Bigger as requested (approx 360x148) */}
                    <div
                        className="flex items-center justify-center rounded-[48px]"
                        style={{
                            width: '360px',
                            height: '148px',
                            backgroundColor: '#5AFEAE',
                        }}
                    >
                        <div className="relative w-[200px] h-[80px]">
                            <Image
                                src="/assets/images/tabby.png"
                                alt="Tabby"
                                fill
                                className="object-contain mix-blend-multiply"
                            />
                        </div>
                    </div>

                    {/* Tamara Logo - Bigger as requested (approx 360x105) */}
                    <div
                        className="flex items-center justify-center rounded-[48px]"
                        style={{
                            width: '360px',
                            height: '105px',
                            backgroundColor: '#16181D',
                        }}
                    >
                        <div className="relative w-[200px] h-[60px]">
                            <Image
                                src="/assets/images/tamara.png"
                                alt="Tamara"
                                fill
                                className="object-contain invert" // White logo on dark bg
                            />
                        </div>
                    </div>
                </div>


                {/* Left Side: Black Capsule (End in RTL) */}
                <div
                    className="flex flex-col items-center justify-center text-center shrink-0 h-full"
                    style={{
                        width: '662px',
                        backgroundColor: '#000000',
                        // In RTL, this is on the left side
                        // Since it's full height (279px), it likely acts as a sidebar of the banner
                        borderTopRightRadius: '64px', // Curved inward to the container
                        borderBottomRightRadius: '64px',
                        borderTopLeftRadius: '62px', // Matches container corner
                        borderBottomLeftRadius: '62px',
                    }}
                >
                    <span
                        className="font-bold text-white font-cairo"
                        style={{
                            fontSize: '45px',
                            lineHeight: '72px',
                        }}
                    >
                        قسط مشترياتك على 4 دفعات
                    </span>
                    <span className="text-xl font-light text-gray-200 mt-2">
                        من غير رسوم او غرامات
                    </span>
                </div>

            </div>
        </div>
    );
}