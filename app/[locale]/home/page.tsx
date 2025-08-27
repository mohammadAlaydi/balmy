"use client";

import ProductCard from "@/components/product-card";
import CarouselComponent from "@/features/home/carousel-component";
import { useTranslations } from "next-intl";

export default function page() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
    },
  ];
  const t = useTranslations("header");

  return (
    <div className="h-[100vh] p-2 md:p-5 flex gap-3 md:gap-5">
      <CarouselComponent products={products} />
    </div>
  );
}
