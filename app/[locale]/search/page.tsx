import PageWrapper from "@/components/page-wrapper";
import SearchComponent from "@/components/search-component";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("breadcrumb");

  return {
    title: t("search") || "search",
  };
}
export default function page() {
  return (
    <PageWrapper>
      <SearchComponent />
    </PageWrapper>
  );
}
