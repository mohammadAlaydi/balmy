import VerifyOtpPageBalmy from "@/components/balmy/verify-otp-page-balmy";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Loading from "@/components/loading";

export async function generateMetadata() {
    const t = await getTranslations("auth");

    return {
        title: t("verify-otp") || "Verify OTP",
    };
}

export default function Page() {
    return (
        <Suspense fallback={<Loading fullScreen variant="spinner" size="xl" />}>
            <VerifyOtpPageBalmy />
        </Suspense>
    );
}
