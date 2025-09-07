"use client";

import { useTranslations } from "next-intl";
import BannerCarousel from "@/features/home/banner-carousel";
import ProductsCarousel from "@/features/home/products-carousel";
import CrossBody from "@/features/home/cross-body";
import Services from "@/features/home/services";
import Categories from "@/features/home/categories";
import PagePadding from "@/components/page-padding";
import { useEffect } from "react";
import { getHomeData } from "@/store/slices/home-slice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/loading";

export default function page() {

  const dispatch = useDispatch()
  const { data, loading } = useSelector((state: any) => state.home)
  useEffect(() => {
    dispatch(getHomeData() as any)
  }, [dispatch])

  const t = useTranslations("home");

  if (loading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  return (
    <div className="min-h-[100vh]">
      <BannerCarousel sliders={data?.sliders} />
      <PagePadding containerClassName="gap-10">
        <Services />
        <Categories categories={data?.featured_categories} />
        <ProductsCarousel products={data?.featured_products} />
        <CrossBody />
        <ProductsCarousel products={data?.new_products} />
      </PagePadding>
    </div>
  );
}
