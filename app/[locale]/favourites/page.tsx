import FavouritePageClient from "../../../features/favourites/favourite-page-client";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  
  const t = await getTranslations("favourites");

  return {
    title: t("title") || "Favourites",
  };
}

export default function Page() {
  return <FavouritePageClient />;
}
