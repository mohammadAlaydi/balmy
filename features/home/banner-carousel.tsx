"use client";

import CarouselComponent from "@/components/carousel-component";
import React from "react";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function BannerCarousel({ sliders }: { sliders: any }) {
  
  const items = Array.isArray(sliders) && sliders.length > 0 ? sliders : [];

  return (
    <div className="w-full">
      <CarouselComponent
        containerClassName="w-full h-full"
        spaceBetween={30}
        slidesPerView={1}
        pagination={true}
        autoPlay={false}
        autoHeight
        swiperClassName="lg:hero h-fit"
        effect="fade"
      >
        {items.map((slider: any, index: number) => (
          <SwiperSlide
            key={index}
            className="w-full h-full relative aspect-[15/10] md:aspect-[16/6]"
          >
            <Image
              src={slider?.image_url}
              alt={slider?.title || "Banner image"}
              fill
              className="object-fill md:object-cover rounded-lg"
              quality={100}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </CarouselComponent>
    </div>
  );
}
