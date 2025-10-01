import CarouselComponent from "@/components/carousel-component";
import ProductCard from "@/components/product-card";
import React from "react";
import { SwiperSlide } from "swiper/react";

export default function ProductsCarousel({ products }: { products: any }) {

  return (
    <CarouselComponent
      containerClassName="w-full h-auto py-5"
      spaceBetween={30}
      slidesPerView={1}
      autoHeight
      breakpoints={{
        300: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        350: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      
      }}
      autoPlay={true}
    >
      {products?.map((product: any, index: number) => (
        <SwiperSlide key={index}>
          <ProductCard product={product} width="w-full" />
        </SwiperSlide>
      ))}
    </CarouselComponent>
  );
}
