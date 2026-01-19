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
import { useLocale } from "next-intl";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function HomePageClient() {

  const { t, loading, data } = useHome();

  if (loading) {
    return <Loading fullScreen variant="spinner" size="xl" />;
  }
  const locale = useLocale();
  return (
    <>
      <BannerCarousel sliders={data?.sliders} />

      <PageWrapper yPadding="py-2.5">
        <Services />
        <Categories categories={data?.featured_categories} locale={locale} />

        <div className="my-5">
          <SectionTitle
            title="Our Products"
            titleStyle="text-xl md:text-3xl mb-5 capitalize text-center"
          />
          <Tabs defaultValue="featured" className="w-full">
            <TabsList className="flex justify-center items-center w-full rounded-none md:p-1.5 h-fit">
              <TabsTrigger value="featured" className="text-xs sm:text-sm md:text-base">
                {t("featured-products")}
              </TabsTrigger>
              <TabsTrigger value="new-arrivals" className="text-xs sm:text-sm md:text-base">
                {t("new-arrivals")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="featured">
              <ProductsCarousel products={data?.featured_products} />
            </TabsContent>
            <TabsContent value="new-arrivals">
              <ProductsCarousel products={data?.new_products} />
            </TabsContent>
          </Tabs>
        </div>

        <Ads ads={data?.ads} />

      </PageWrapper>
    </>
  );
}
