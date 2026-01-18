import { Metadata } from "next";
import ClientPage from "../../../../features/cms/client-page";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const slug = params.slug;
    const locale = slug.split("/")[1] || "en";

    const response = await fetch(`${API_URL}/v1/home?locale=${locale}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch CMS metadata");
    }

    const data = await response.json();

    const page = data?.cms_pages?.find((p: any) => p.url_key === slug);

    return {
      title: page?.page_title || "Default Title",
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Default Title",
    };
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ClientPage params={params} />;
}
