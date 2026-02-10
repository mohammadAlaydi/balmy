"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

interface ProductsSectionBalmyProps {
    title: string;
    products: any[];
    maxProducts?: number;
    categoryId?: number;
    showViewAll?: boolean;
}

export default function ProductsSectionBalmy({
    title,
    products,
    maxProducts = 10,
    categoryId,
    showViewAll = true,
}: ProductsSectionBalmyProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const pathname = usePathname();
    const locale = pathname?.split("/")[1] || "ar";

    React.useEffect(() => {
        if (!api) return;

        const updateScrollButtons = () => {
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        };

        updateScrollButtons();
        api.on("select", updateScrollButtons);
        api.on("reInit", updateScrollButtons);

        return () => {
            api.off("select", updateScrollButtons);
        };
    }, [api]);

    if (!products || products.length === 0) {
        return null;
    }

    // Limit products to show
    const displayProducts = products.slice(0, maxProducts);

    return (
        <section className="relative w-full mb-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6" dir="rtl">
                <h2 className="text-[var(--color-black-2)] text-xl md:text-2xl lg:text-3xl font-medium">
                    {title}
                </h2>
                <div className="flex items-center gap-3">
                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-2">
                        {/* Left arrow - go to previous */}
                        <button
                            onClick={() => api?.scrollNext()}
                            disabled={!canScrollNext}
                            className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${canScrollNext
                                ? "border-rose-500 bg-white hover:bg-rose-500 text-rose-500 hover:text-white cursor-pointer"
                                : "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                                }`}
                            aria-label="Next"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        {/* Left arrow - go to previous */}
                        <button
                            onClick={() => api?.scrollPrev()}
                            disabled={!canScrollPrev}
                            className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${canScrollPrev
                                ? "border-rose-500 bg-white hover:bg-rose-500 text-rose-500 hover:text-white cursor-pointer"
                                : "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                                }`}
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    </div>

                    {/* View All Link */}
                    {showViewAll && categoryId && (
                        <Link
                            href={`/${locale}/category/${categoryId}`}
                            className="flex items-center gap-1 text-rose-600 hover:text-rose-700 text-sm md:text-base font-medium transition-colors"
                        >
                            عرض الكل
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Products Carousel - LTR for correct sliding */}
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: false,
                    skipSnaps: true,
                    containScroll: "trimSnaps",
                    slidesToScroll: 2,
                }}
                className="w-full cursor-grab active:cursor-grabbing"
            >
                <CarouselContent className="-ml-3 md:-ml-4">
                    {displayProducts.map((product, index) => (
                        <CarouselItem
                            key={product.product_id || product.id || index}
                            className="pl-3 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                        >
                            <ProductCard
                                product={product}
                                cardColSpan="col-span-1"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
}
