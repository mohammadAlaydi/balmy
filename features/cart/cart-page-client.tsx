"use client";

import { CartSectionBalmy, BreadcrumbBalmy } from "@/components/balmy";
import Loading from "@/components/loading";
import UseCart from "@/hooks/use-cart";
import { useTranslations } from "next-intl";

export default function CartPageClient() {
  const { t, data, isOpen, setIsOpen, dispatch, isLoading } = UseCart();
  const tNav = useTranslations("navigation");
  const tCart = useTranslations("cart");

  // Uncomment if loading state is required
  // if (isLoading) {
  //   return <Loading fullScreen={true} variant="spinner" size="xl" />;
  // }

  const breadcrumb = (
    <BreadcrumbBalmy
      items={[
        { label: tNav("home"), href: "/home" },
        { label: tCart("title") }
      ]}
    />
  );

  return <CartSectionBalmy data={data} breadcrumb={breadcrumb} />;
}
