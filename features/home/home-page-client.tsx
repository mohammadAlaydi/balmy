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

  // Get homeSections from API - this contains the ordered sections with data
  const homeSections = data?._raw?.homeSections || data?.homeSections || [];

  // Render section based on type
  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'category':
        // Render category products section
        const category = section.data;
        if (!category?.productList || category.productList.length === 0) return null;
        return (
          <ProductsSectionBalmy
            key={`category-${category.categoryId || index}`}
            title={category.categoryName}
            products={category.productList}
            categoryId={category.categoryId}
            maxProducts={8}
          />
        );

      case 'payment_installment':
        // Render payment installment banner
        return <PaymentInstallmentBanner key={`payment-${index}`} />;

      case 'partners':
        // Render partners/brands showcase section with data from API
        return (
          <BrandsShowcaseSection
            key={`partners-${index}`}
            title={section.data?.title}
            subtitle={section.data?.subtitle}
            partners={section.data?.partners}
          />
        );

      case 'ad':
        // Render promotional ad banner with data from API
        return (
          <PromotionalBannerSection
            key={`ad-${index}`}
            ad={section.data}
          />
        );

      case 'promotions':
        // Render trust features section with data from API
        return (
          <TrustFeaturesSection
            key={`promotions-${index}`}
            promotions={section.data}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero Slider Section with dynamic banners */}
      <HeroSlider banners={bannerImages} />

      <PageWrapper yPadding="py-2.5">
        <div className="my-8 flex flex-col gap-10 relative">

          {/* Render homeSections from API in order */}
          {homeSections.length > 0 ? (
            homeSections.map((section: any, index: number) => renderSection(section, index))
          ) : (
            // Fallback if homeSections not available - use old behavior
            <>
              {data?.featuredCategories?.map((category: any) => (
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
              <BrandsShowcaseSection />
              <PromotionalBannerSection />
              <TrustFeaturesSection />
            </>
          )}

        </div>
      </PageWrapper>
    </>
  );
}

