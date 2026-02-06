"use client";

import HeroSlider from "@/components/balmy/hero-slider";
import { ProductsSectionBalmy, PaymentInstallmentBanner, BrandsShowcaseSection, PromotionalBannerSection, TrustFeaturesSection } from "@/components/balmy";

import Loading from "@/components/loading";
import PageWrapper from "@/components/page-wrapper";
import useHome from "@/hooks/use-home";

export default function HomePageClient() {
  const { t, loading, data } = useHome();

  if (loading) {
    return <Loading fullScreen variant="spinner" size="xl" />;
  }

  // Get bannerImages directly from raw data or transformed sliders
  const bannerImages = data?._raw?.bannerImages || data?.sliders || [];
  const featuredCategories = data?.featuredCategories || [];

  return (
    <>
      {/* Hero Slider Section with dynamic banners */}
      <HeroSlider banners={bannerImages} />

      <PageWrapper yPadding="py-2.5">
        <div className="my-8 flex flex-col gap-10 relative">

          {/* Featured Categories with Products - Start immediately with products */}
          {featuredCategories.map((category: any) => (
            category.products && category.products.length > 0 && (
              <ProductsSectionBalmy
                key={category.id}
                title={category.name}
                products={category.products}
                categoryId={category.id}
                maxProducts={8}
              />
            )
          ))}

          {/* Fallback: Show featured_products if no featured categories */}
          {featuredCategories.length === 0 && data?.featured_products && data.featured_products.length > 0 && (
            <ProductsSectionBalmy
              title="منتجات مميزة"
              products={data.featured_products}
              maxProducts={8}
              showViewAll={false}
            />
          )}

          {/* Best Sellers Section */}
          {data?.best_sellers && data.best_sellers.length > 0 && (
            <ProductsSectionBalmy
              title="الأكثر مبيعاً"
              products={data.best_sellers}
              maxProducts={8}
              showViewAll={false}
            />
          )}

          {/* Payment Installment Banner */}
          <PaymentInstallmentBanner />

          {/* New Products Section */}
          {data?.new_products && data.new_products.length > 0 && (
            <ProductsSectionBalmy
              title="وصل حديثاً"
              products={data.new_products}
              maxProducts={8}
              showViewAll={false}
            />
          )}

          {/* Brands Showcase Section */}
          <BrandsShowcaseSection />

          {/* Promotional Banner Section */}
          <PromotionalBannerSection />

          {/* Trust Features & Partners Section */}
          <TrustFeaturesSection />
        </div>
      </PageWrapper>
    </>
  );
}
