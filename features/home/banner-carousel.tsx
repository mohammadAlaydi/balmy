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
      >
        {items.map((slider: any, index: number) => (
          <SwiperSlide
            key={index}
            className={`w-full h-full relative fade-item-${
              index + 1
            } fade-item`}
          >
            <Image
              src={slider?.image_url}
              alt={slider?.title || "Banner image"}
              width={500}
              height={400}
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-full object-cover aspect-square lg:aspect-auto"
              quality={100}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </CarouselComponent>
    </div>
  );
}
