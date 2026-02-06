import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { HeaderBalmy, FooterBalmy } from "@/components/balmy";
import ReduxProvider from "@/store/redux-provider";
import Providers from "@/components/providers";
import AuthInitializer from "@/components/auth/auth-initializer";
import ToTop from "@/components/layout/to-top/to-top";
import WhatsAppIcon from "@/components/layout/whats-app/whats-app-icon";
import { DISABLE_BACKEND_FETCH } from "@/lib/dev-config";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
  preload: true,
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function toAbsoluteUrl(maybeUrl: string | undefined | null) {
  if (!maybeUrl) return undefined;
  if (maybeUrl.startsWith("http://") || maybeUrl.startsWith("https://")) {
    return maybeUrl;
  }
  if (!API_URL) return maybeUrl; // fallback (keeps behavior predictable)
  try {
    return new URL(maybeUrl, API_URL).toString();
  } catch {
    return maybeUrl;
  }
}

// Default metadata for dev mode
const DEFAULT_METADATA: Metadata = {
  title: "Balmy Store (Dev Mode)",
  description: "Welcome to our online store - Development Mode",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Balmy Store (Dev Mode)",
    description: "Welcome to our online store - Development Mode",
    type: "website",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale = "ar" } = await params;

  // DEV MODE: Return default metadata when backend is disabled
  if (DISABLE_BACKEND_FETCH) {
    console.log("🚧 [DEV] generateMetadata bypassed - using default metadata");
    return DEFAULT_METADATA;
  }

  try {
    if (!API_URL) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL is not set - using default metadata");
      return DEFAULT_METADATA;
    }

    // Markatty uses /catalog/homepage format
    const response = await fetch(`${API_URL}/catalog/homepage?storeId=1&currency=EGP&locale=${locale}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(`SEO fetch failed: ${response.statusText}`);
      return DEFAULT_METADATA;
    }

    const data = await response.json();
    // Markatty uses homeSEO format
    const seo = data?.homeSEO || {};
    const logo = toAbsoluteUrl(data?.logo_url);

    return {
      title: seo?.meta_title || "My Store",
      description: seo?.meta_description || "Welcome to our online store.",
      keywords: seo?.meta_keywords || [
        "e-commerce",
        "shopping",
        "products",
        "quality",
      ],
      icons: logo ? {
        icon: [{ url: logo }],
        apple: [{ url: logo }],
      } : {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
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
            url: data?.seo_settings?.channel?.logo || "/og-image.jpg",
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
  params: Promise<{ locale: string }>;
}>) {
  const { locale = "ar" } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${cairo.variable} ${tajawal.variable} font-cairo min-h-screen flex flex-col`}>
        <ReduxProvider>
          <NextIntlClientProvider messages={messages}>
            <HeaderBalmy />
            <AuthInitializer />
            <Providers>{children}</Providers>
            <FooterBalmy />
            <ToTop />
            <WhatsAppIcon />
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
