import CarouselComponent from "@/components/carousel-component";
import React from "react";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function BannerCarousel() {
  return (
    <CarouselComponent
      containerClassName="w-full h-[70vh]"
      spaceBetween={30}
      slidesPerView={1}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <SwiperSlide key={index}>
          <Image
            src={"/assets/images/banner.jpg"}
            alt="carousel"
            fill
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </CarouselComponent>
  );
}
