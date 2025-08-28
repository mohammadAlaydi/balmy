"use client";

import { useTranslations } from "next-intl";
import BannerCarousel from "@/features/home/banner-carousel";
import ProductsCarousel from "@/features/home/products-carousel";

export default function page() {
  const t = useTranslations("header");

  return (
    <div className="min-h-[100vh]">
      <BannerCarousel />
      <ProductsCarousel />
    </div>
  );
}
