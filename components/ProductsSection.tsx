"use client";

import ProductCard from "./ProductCard";

interface ProductsSectionProps {
  title: string;
  products: any[];
}

export default function ProductsSection({
  title,
  products,
}: ProductsSectionProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full mb-16" dir="rtl">
      {/* Section Title */}
      <h2 className="text-gray-900 text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-right">
        {title}
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.product_id || index}
            brandName={product.name || product.brand_name}
            productName={product.description || product.name}
            price={product.price}
            oldPrice={product.original_price || product.price_regular?.value}
            discount={product.discount_percent}
            imageUrl={product.images?.[0]?.url || product.image || "/images/card-image.png"}
            category={product.category?.name || product.category}
            rating={product.rating || 5}
            isVerified={product.is_verified !== false}
          />
        ))}
      </div>
    </section>
  );
}
