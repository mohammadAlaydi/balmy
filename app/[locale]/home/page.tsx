import { getTranslations } from "next-intl/server";
import HomePageClient from "../../../features/home/home-page-client";

export async function generateMetadata() {

  const t = await getTranslations("navigation");

  return {
    title: t("home") || "Home",
  };
}
// home page
export default function Page() {
  return <HomePageClient />;
}
