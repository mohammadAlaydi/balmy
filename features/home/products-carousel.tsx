import CarouselComponent from "@/components/carousel-component";
import ProductCard from "@/components/product-card";
import React from "react";
import { SwiperSlide } from "swiper/react";

export default function ProductsCarousel({ products }: { products: any }) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return null;
  }

  // Limit to 8 products (2 rows x 4 columns on large screens)
  const displayedProducts = products.slice(0, 8);

  return (
    <CarouselComponent
      containerClassName="w-full h-auto py-5"
      spaceBetween={30}
      slidesPerView={1}
      autoHeight
      breakpoints={{
        300: {
          slidesPerView: 2,
          slidesPerColumn: 2,
          spaceBetween: 8,
        },
        350: {
          slidesPerView: 2,
          slidesPerColumn: 2,
          spaceBetween: 8,
        },
        700: {
          slidesPerView: 3,
          slidesPerColumn: 2,
          spaceBetween: 8,
        },
        1200: {
          slidesPerView: 4,
          slidesPerColumn: 2,
          spaceBetween: 15,
        },
        1500: {
          slidesPerView: 5,
          slidesPerColumn: 2,
          spaceBetween: 15,
        },
        1800: {
          slidesPerView: 6,
          slidesPerColumn: 2,
          spaceBetween: 15,
        },
      }}
      autoPlay={true}
    >
      {displayedProducts.map((product: any, index: number) => (
        <SwiperSlide key={product?.id || product?.product_id || index}>
          <ProductCard product={product} width="w-full" />
        </SwiperSlide>
      ))}
    </CarouselComponent>
  );
}
