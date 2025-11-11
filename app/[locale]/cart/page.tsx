import { getTranslations } from "next-intl/server";
import CartPageClient from "../../../features/cart/cart-page-client";

export async function generateMetadata() {
  
  const t = await getTranslations("products");

  return {
    title: t("cart") || "Cart",
  };
}

export default function Page() {
  return <CartPageClient />;
}
