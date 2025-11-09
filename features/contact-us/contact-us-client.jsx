"use client";

import { useTranslations } from "next-intl";
import ConatctUsBanner from "@/features/contact-us/contact-us-banner";
import ConatctUsForm from "@/features/contact-us/contact-us-form";
import ContactUsInfo from "@/features/contact-us/contact-us-info";
import BottomMessage from "@/features/contact-us/bottom-message";

export default function ContactUsClient() {

    const t = useTranslations("contact-us");

    return (
        <div className="min-h-screen bg-background">
            <ConatctUsBanner t={t} />
            <div className="container mx-auto px-4 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <ContactUsInfo t={t} />
                    <ConatctUsForm t={t} />
                </div>
                <BottomMessage t={t} />
            </div>
        </div>
    );
}
