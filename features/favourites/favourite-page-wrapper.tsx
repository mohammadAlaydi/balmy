"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/loading";

const FavouritePageClient = dynamic(
  () => import("./favourite-page-client"),
  {
    ssr: false,
    loading: () => (
      <Loading fullScreen={true} variant="spinner" size="xl" />
    ),
  }
);

export default function FavouritePageWrapper() {
  return <FavouritePageClient />;
}
