"use client";

import Loading from "@/components/loading";
import ProductCard from "@/components/product-card";
import CategoryFilter from "@/components/category-filter";
import PageWrapper from "@/components/page-wrapper";
import useCategory from "@/hooks/use-category";

export default function CategoryPage() {
  const { loading, error, t, categoryProducts, filteredProducts, handleFilterChange } =
    useCategory();

  const products = categoryProducts?.data || [];
  const hasProducts = products.length > 0;
  const hasFiltered = filteredProducts.length > 0;

  // ✅ Loading state
  if (loading) {
    return <Loading fullScreen variant="spinner" size="xl" />;
  }

  // ✅ Error state
  if (error) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-[65vh]">
          <p className="text-base md:text-lg xl:text-xl text-center text-red-600">
            {t("error-loading-products") ||
              "Error loading products. Please try again."}
          </p>
        </div>
      </PageWrapper>
    );
  }

  // ✅ Main render
  return (
    <PageWrapper>
      {hasProducts && (
        <div className="flex flex-wrap items-center gap-5 justify-start mb-10">
          <CategoryFilter products={products} onFilterChange={handleFilterChange} />
          <p className="text-gray-600 whitespace-nowrap">
            {t("products-count", { count: filteredProducts.length })}
          </p>
        </div>
      )}

      {hasFiltered ? (
        <div className="grid grid-cols-12 gap-2 md:gap-3 xl:gap-5 min-h-[65vh]">
          {filteredProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              cardColSpan="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3"
            />
          ))}
        </div>
      ) : hasProducts ? (
        <NoResults text={t("no-products-match-filters")} />
      ) : (
        <NoResults text={t("no-products-found")} />
      )}
    </PageWrapper>
  );
}

/** 🧩 Small reusable sub-component for empty states */
function NoResults({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center min-h-[65vh]">
      <p className="text-base md:text-lg xl:text-xl text-center text-gray-600">
        {text}
      </p>
    </div>
  );
}
