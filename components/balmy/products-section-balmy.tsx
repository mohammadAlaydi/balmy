"use client";

import ProductCardBalmy from "./product-card-balmy";

interface ProductsSectionBalmyProps {
    title: string;
    products: any[];
}

export default function ProductsSectionBalmy({
    title,
    products,
}: ProductsSectionBalmyProps) {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="relative w-full mb-16" dir="rtl">
            {/* Section Title */}
            <h2 className="text-[var(--color-black-2)] text-2xl md:text-3xl lg:text-[40px] lg:leading-[75px] font-medium mb-8 text-right">
                {title}
            </h2>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product, index) => (
                    <ProductCardBalmy
                        key={product.product_id || index}
                        product={product}
                        cardColSpan="col-span-1"
                    />
                ))}
            </div>
        </section>
    );
}
