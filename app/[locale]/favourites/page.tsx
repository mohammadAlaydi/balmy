import { getTranslations } from "next-intl/server";
import FavouritePageWrapper from "../../../features/favourites/favourite-page-wrapper";

export async function generateMetadata() {
  const t = await getTranslations("favourites");

  return {
    title: t("title") || "Favourites",
  };
}

export default function Page() {
  return <FavouritePageWrapper />;
}
