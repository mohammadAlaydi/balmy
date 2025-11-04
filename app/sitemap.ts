import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const apiUrl = process.env.NEXT_PUBLIC_API_URL ;

// ✅ Fetch products safely
async function getProducts() {
  try {
    const res = await fetch(`${apiUrl}/v1/categorysearch`, {
      headers: { accept: "application/json" },
      next: { revalidate: 60 * 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}

// ✅ Fetch CMS pages safely
async function getCMSPages() {
  try {
    const res = await fetch(`${apiUrl}/v1/home`, {
      headers: { accept: "application/json" },
      next: { revalidate: 60 * 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch CMS pages");
    const data = await res.json();
    return Array.isArray(data?.cms_pages) ? data?.cms_pages : [];
  } catch (error) {
    console.error("❌ Error fetching CMS pages:", error);
    return [];
  }
}

// ✅ Sitemap generator with locales
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["en", "ar"];
  const staticPages = [
    "/home",
    "/cart",
    "/contact-us",
    "/favourite",
    "/search",
    "/user-profile",
  ];

  const products = await getProducts();
  const cmsPages = await getCMSPages();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Static pages
    sitemapEntries.push(
      ...staticPages.map((path) => ({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date().toISOString(),
      }))
    );

    // Product pages
    sitemapEntries.push(
      ...products.map((product: any) => ({
        url: `${baseUrl}/${locale}/product/${product.id}`,
        lastModified: new Date().toISOString(),
      }))
    );

    // CMS pages
    sitemapEntries.push(
      ...cmsPages.map((page: any) => ({
        url: `${baseUrl}/${locale}/cms/${page.url_key}`,
        lastModified: page.updated_at
          ? new Date(page.updated_at).toISOString()
          : new Date().toISOString(),
      }))
    );
  }

  return sitemapEntries;
}
