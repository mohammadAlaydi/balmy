import { Metadata } from "next";
import CategoryPageClient from "../../../../features/category/category-page-client";
import { DISABLE_BACKEND_FETCH, MOCK_CATEGORIES } from "@/lib/dev-config";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({
  params,
}: {
  params: { id: string; locale?: string };
}): Promise<Metadata> {
  // DEV MODE: Return mock metadata when backend is disabled
  if (DISABLE_BACKEND_FETCH) {
    const mockCategory = MOCK_CATEGORIES.find(c => c.id.toString() === params.id) || MOCK_CATEGORIES[0];
    return {
      title: mockCategory?.name || "Category (Dev Mode)",
    };
  }

  try {
    const locale = params.locale || "en";

    const res = await fetch(`${API_URL}/v1/categories?locale=${locale}`, {
      headers: { accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();

    // Find category by id (cast to string to match params.id)
    const category = data?.categories?.find(
      (cat: any) => cat?.id.toString() === params.id.toString()
    );


    return {
      title: category?.name,
    };
  } catch (error) {
    console.error("Failed to fetch category metadata:", error);
    return {
      title: "Category",
    };
  }
}

export default function Page({
  params,
}: {
  params: { id: string; locale?: string };
}) {
  return <CategoryPageClient categoryId={params.id} />;
}

