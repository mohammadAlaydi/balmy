"use client";

import { LocateFixed } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TrackOrderButtonBalmy() {
    const t = useTranslations("navigation");

    return (
        <button
            className="absolute h-[50px] md:h-[74px] border border-[var(--color-white)] rounded-[30px] opacity-100 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors px-4 md:px-6 z-20"
            style={{
                bottom: "10%",
                left: "5%",
                fontFamily: "var(--font-cairo)",
            }}
        >

            <span className="text-[var(--color-white)] text-lg md:text-[24px] font-semibold text-start whitespace-nowrap">
                {t("track-order") || "تتبـــع الطلـــب"}
            </span>
            <LocateFixed className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-white)]" />
        </button>
    );
}
