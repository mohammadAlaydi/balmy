import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getProducts() {
  const res = await fetch(`${baseUrl}/api/v1/categorysearch`, {
    headers: { accept: "application/json" },
  });
  const data = await res.json();
  return Array.isArray(data.data) ? data.data : [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const products = await getProducts();
    return products.map((product: any) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
    return [];
  }
}
