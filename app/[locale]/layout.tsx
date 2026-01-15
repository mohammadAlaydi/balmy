import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import ReduxProvider from "@/store/redux-provider";
import Providers from "@/components/providers";
import AuthInitializer from "@/components/auth/auth-initializer";
import BreadcrumbWrapper from "@/components/layout/breadcrumb-wrapper";
import ToTop from "@/components/layout/to-top/to-top";
import WhatsAppIcon from "@/components/whats-app-icon";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params?.locale || "ar";

  try {
    const response = await fetch(`${API_URL}/v1/home?locale=${locale}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch SEO data: ${response.statusText}`);
    }

    const data = await response.json();
    const seo = data?.seo_settings?.channel?.meta_data;
    let logo = data?.seo_settings?.channel?.logo;

    if (logo && !logo.startsWith("http")) {
      logo = `${API_URL}${logo.startsWith("/") ? "" : "/"}${logo}`;
    }

    console.log("🖼️ favicon:", logo);

    return {
      title: seo?.meta_title || "My Store",
      description: seo?.meta_description || "Welcome to our online store.",
      keywords:
        seo?.meta_keywords || [
          "e-commerce",
          "shopping",
          "products",
          "quality",
        ],
      icons: {
        icon: logo ,
        apple: logo ,
      },
      twitter: {
        card: "summary_large_image",
        title: seo?.meta_title || "My Store",
        description: seo?.meta_description || "",
      },
      openGraph: {
        title: seo?.meta_title || "My Store",
        description: seo?.meta_description || "",
        type: "website",
        images: [
          {
            url: logo || "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: seo?.meta_title || "My Store",
          },
        ],
      },
    };
  } catch (error) {
    console.error("SEO metadata fetch failed:", error);

    return {
      title: "My Store",
      description: "Welcome to our online store.",
      icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
      },
      openGraph: {
        title: "My Store",
        description: "Welcome to our online store.",
        type: "website",
      },
    };
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = params.locale || "ar";
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${cairo.variable} font-cairo`}>
        <ReduxProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <BreadcrumbWrapper />
            <AuthInitializer />
            <Providers>{children}</Providers>
            <Footer />
            <ToTop />
            <WhatsAppIcon />
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
