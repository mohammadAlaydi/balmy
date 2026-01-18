"use client";

import BannerCarousel from "@/features/home/banner-carousel";
import ProductsCarousel from "@/features/home/products-carousel";
import Ads from "@/features/home/ads";
import Services from "@/features/home/services";
import Categories from "@/features/home/categories";
import Loading from "@/components/loading";
import PageWrapper from "@/components/page-wrapper";
import SectionTitle from "@/components/section-title";
import useHome from "@/hooks/use-home";

export default function HomePageClient() {
  const { t, loading, data } = useHome();

  if (loading) {
    return <Loading fullScreen variant="spinner" size="xl" />;
  }

  return (
    <>
      <BannerCarousel sliders={data?.sliders} />

      <Services />

      <PageWrapper yPadding="py-5">
        <Categories categories={data?.featured_categories} />

        <SectionTitle
          title={t("featured-products")}
          titleStyle="text-xl md:text-3xl my-5"
        />
        <ProductsCarousel products={data?.featured_products} />

        <Ads ads={data?.ads} />

        <SectionTitle
          title={t("new-arrivals")}
          titleStyle="text-xl md:text-3xl my-5"
        />
        <ProductsCarousel products={data?.new_products} />
      </PageWrapper>
    </>
  );
}
