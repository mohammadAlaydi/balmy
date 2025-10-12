"use client";

import { useTranslations } from "next-intl";
import BannerCarousel from "@/features/home/banner-carousel";
import ProductsCarousel from "@/features/home/products-carousel";
import Ads from "@/features/home/ads";
import Services from "@/features/home/services";
import Categories from "@/features/home/categories";
import { useEffect } from "react";
import { getHomeData } from "@/store/slices/home-slice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/loading";
import PageWrapper from "@/components/page-wrapper";
import SectionTitle from "@/components/section-title";

export default function page() {
  
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: any) => state.home);
  useEffect(() => {
    dispatch(getHomeData() as any);
  }, [dispatch]);

  const t = useTranslations("home");

  if (loading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  return (
    <>
      <BannerCarousel sliders={data?.sliders} />
      <PageWrapper>
        <Services />
        <Categories categories={data?.featured_categories} />
        <SectionTitle title={t("featured-products")} titleStyle="text-xl md:text-3xl my-5"/> 
        <ProductsCarousel products={data?.featured_products} />
        <Ads ads={data?.ads} />
        <SectionTitle title={t("new-arrivals")}  titleStyle="text-xl md:text-3xl my-5"/>
        <ProductsCarousel products={data?.new_products} />
      </PageWrapper>
    </>
  );
}
