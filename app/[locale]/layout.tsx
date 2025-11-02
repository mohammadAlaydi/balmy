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

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ فقط generateMetadata (بدون metadata)
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale || "ar";

  try {
    const response = await fetch(`${API_URL}/v1/home?locale=${locale}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    const data = await response.json();
    const seo = data?.seo_settings?.channel?.meta_data;

    return {
      title: seo?.meta_title,
      description: seo?.meta_description || "",
      keywords: seo?.meta_keywords || [
        "e-commerce",
        "shopping",
        "products",
        "quality",
      ],
      twitter: {
        card: "summary_large_image",
      },
      openGraph: {
        title: seo?.meta_title || "",
        description: seo?.meta_description || "",
        type: "website",
      },
    };
  } catch (error) {
    console.error("SEO metadata fetch failed:", error);
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
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
