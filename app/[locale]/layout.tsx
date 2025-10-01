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

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Farada - Premium E-commerce Store",
  description: "Discover high-quality products with exceptional service",
  keywords: ["e-commerce", "shopping", "products", "quality"],
  authors: [{ name: "Farada Team" }],
  openGraph: {
    title: "Farada - Premium E-commerce Store",
    description: "Discover high-quality products with exceptional service",
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <body className={`${cairo.variable} font-cairo`}>
        <ReduxProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <BreadcrumbWrapper />
            <AuthInitializer />
            <Providers>{children}</Providers>
            <Footer />
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
