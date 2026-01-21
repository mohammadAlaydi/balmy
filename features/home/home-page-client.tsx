"use client";

import { HeroBalmy, ProductsSectionBalmy } from "@/components/balmy";
import ProductsSection from "@/components/ProductsSection";
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
  const locale = useLocale();

  if (loading) {
    return <Loading fullScreen variant="spinner" size="xl" />;
  }

  return (
    <>
      {/* Hero Section with new Balmy styling */}
      <HeroBalmy sliders={data?.sliders} />

      {/* Services Section */}
      <div className="bg-gray-50">
        <PageWrapper yPadding="py-2.5 md:py-5">
          <Services />
        </PageWrapper>
      </div>

      <PageWrapper yPadding="py-2.5">
        <Categories categories={data?.featured_categories} locale={locale} />

        <div className="my-16 relative pt-[100px]">
          {/* Featured Products Section */}
          {data?.featured_products && data.featured_products.length > 0 && (
            <ProductsSection
              title="عــــــــــــــــروضنا"
              products={data.featured_products}
            />
          )}

          {/* Best Sellers Section */}
          {data?.best_sellers && data.best_sellers.length > 0 && (
            <ProductsSection
              title="الأكثــــــــر مبيعــــــــا"
              products={data.best_sellers}
            />
          )}

          {/* New Arrivals Section */}
          {data?.new_products && data.new_products.length > 0 && (
            <ProductsSection
              title="وصــــــــــل حديثــــــــــا"
              products={data.new_products}
            />
          )}
        </div>


        <Ads ads={data?.ads} />
      </PageWrapper>
    </>
  );
}
