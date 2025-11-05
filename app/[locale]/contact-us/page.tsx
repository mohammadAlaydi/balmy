"use client";

import { useTranslations } from "next-intl";
import ConatctUsBanner from "@/features/contact-us/contact-us-banner";
import ConatctUsForm from "@/features/contact-us/contact-us-form";
import ContactUsInfo from "@/features/contact-us/contact-us-info";
import BottomMessage from "@/features/contact-us/bottom-message";

export default function page() {

  const t = useTranslations("contact-us");

  return (
    <div className="min-h-screen bg-background">
      {/* banner Section */}
      <ConatctUsBanner t={t} />
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Us Information */}
          <ContactUsInfo t={t} />
          {/* Contact Us Form */}
          <ConatctUsForm t={t} />
        </div>
        {/* Bottom Section */}
        <BottomMessage t={t} />
      </div>
    </div>
  );
}
