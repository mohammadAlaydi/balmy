"use client";

import { HeroBalmy, ProductsSectionBalmy, PaymentInstallmentBanner, BrandsShowcaseSection, PromotionalBannerSection } from "@/components/balmy";
import ProductsSection from "@/components/ProductsSection";
import BannerCarousel from "@/features/home/banner-carousel";
import ProductsCarousel from "@/features/home/products-carousel";
import Loading from "@/components/loading";
import PageWrapper from "@/components/page-wrapper";
import useHome from "@/hooks/use-home";
import { useLocale } from "next-intl";

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

      <PageWrapper yPadding="py-2.5">
        <div className="my-8 flex flex-col gap-16 relative">
          {/* Featured Products Section */}
          {data?.featured_products && data.featured_products.length > 0 && (
            <ProductsSection
              title="العـــــــروض"
              products={data.featured_products.slice(0, 4)}
            />
          )}

          {/* Best Sellers Section */}
          {data?.best_sellers && data.best_sellers.length > 0 && (
            <ProductsSection
              title="الأكثـــر مبيعــــــــــــاً"
              products={data.best_sellers.slice(0, 4)}
            />
          )}

          {/* Payment Installment Banner */}
          <PaymentInstallmentBanner />

          {/* Exclusive Section */}
          {data?.exclusive_products && data.exclusive_products.length > 0 && (
            <ProductsSection
              title="حصـــــــــــري"
              products={data.exclusive_products.slice(0, 4)}
            />
          )}

          {/* Brands Showcase Section */}
          <BrandsShowcaseSection />

          {/* Sets and Collections Section */}
          {data?.sets_products && data.sets_products.length > 0 && (
            <ProductsSection
              title="اطقم ومجموعات"
              products={data.sets_products.slice(0, 4)}
            />
          )}

          {/* Promotional Banner Section */}
          <PromotionalBannerSection />

          {/* Niche Section */}
          {data?.niche_products && data.niche_products.length > 0 && (
            <ProductsSection
              title="نيــــــــــــش"
              products={data.niche_products.slice(0, 4)}
            />
          )}
        </div>
      </PageWrapper>
    </>
  );
}
