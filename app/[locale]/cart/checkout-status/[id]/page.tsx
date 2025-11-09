import { getTranslations } from "next-intl/server";
import OrderStatusClient from "../../../../../features/cart/checkout-status/order-status-client";

export async function generateMetadata() {
  const t = await getTranslations("order");

  return {
    title: t("order-status") || "Order Status",
  };
}

export default function Page() {
  return <OrderStatusClient />;
}
