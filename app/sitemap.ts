import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_COMPANY_URL || "http://localhost:3000";

// ✅ Simplified sitemap with static pages only
// Dynamic product pages will be handled by search engines via crawling
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["en", "ar"];
  const staticPages = [
    "/home",
    "/cart",
    "/contact-us",
    "/favourites",
    "/search",
    "/user-profile",
    "/about-us",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Static pages
    sitemapEntries.push(
      ...staticPages.map((path) => ({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: path === '/home' ? 1.0 : 0.8,
      }))
    );
  }

  return sitemapEntries;
}
