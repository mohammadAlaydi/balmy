"use client";

import { useTranslations } from "next-intl";
import BannerCarousel from "@/features/home/banner-carousel";
import ProductsCarousel from "@/features/home/products-carousel";
import CrossBody from "@/features/home/cross-body";
import Services from "@/features/home/services";
import Categories from "@/features/home/categories";
import PagePadding from "@/components/page-padding";
import { products } from "@/static-data/static-data";

export default function page() {
  
  const t = useTranslations("header");

  return (
    <div className="min-h-[100vh]">
      <BannerCarousel />
      <PagePadding>
        <Services />
        <Categories />
        <ProductsCarousel products={products} />
        <CrossBody />
        <ProductsCarousel products={products} />
      </PagePadding>
    </div>
  );
}
