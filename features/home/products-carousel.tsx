import CarouselComponent from "@/components/carousel-component";
import ProductCard from "@/components/product-card";
import { products } from "@/static-data/static-data";
import React from "react";
import { SwiperSlide } from "swiper/react";

export default function ProductsCarousel() {
  return (
    <CarouselComponent
      containerClassName="w-full h-[70vh]"
      spaceBetween={15}
      slidesPerView={1}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        301: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6,
        },
        1660: {
          slidesPerView: 7,
        },
      }}
    >
      {products?.map((product, index) => (
        <SwiperSlide key={index}>
          <ProductCard product={product} width="w-full" />
        </SwiperSlide>
      ))}
    </CarouselComponent>
  );
}
