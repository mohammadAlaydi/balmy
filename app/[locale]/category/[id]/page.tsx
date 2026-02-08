import { Metadata } from "next";
import CategoryPageClient from "../../../../features/category/category-page-client";
import { DISABLE_BACKEND_FETCH, MOCK_CATEGORIES } from "@/lib/dev-config";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale?: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;

  // DEV MODE: Return mock metadata when backend is disabled
  if (DISABLE_BACKEND_FETCH) {
    const mockCategory = MOCK_CATEGORIES.find(c => c.id.toString() === id) || MOCK_CATEGORIES[0];
    return {
      title: mockCategory?.name || "Category (Dev Mode)",
    };
  }

  try {
    const loc = locale || "en";

    const res = await fetch(`${API_URL}/v1/categories?locale=${loc}`, {
      headers: { accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();

    // Find category by id
    const category = data?.categories?.find(
      (cat: any) => cat?.id.toString() === id.toString()
    );

    return {
      title: category?.name || "Category",
    };
  } catch (error) {
    console.error("Failed to fetch category metadata:", error);
    return {
      title: "Category",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; locale?: string }>;
}) {
  const { id } = await params;
  return <CategoryPageClient categoryId={id} />;
}
