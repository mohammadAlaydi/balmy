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
            {slider?.image_url ? (
              <Image
                src={slider?.image_url}
                alt={slider?.title || "Banner image"}
                fill
                className="object-fill md:object-cover rounded-lg"
                quality={100}
                priority={index === 0}
                unoptimized={slider?.image_url?.startsWith('http') && !slider?.image_url?.includes('localhost') && !slider?.image_url?.includes(process.env.NEXT_PUBLIC_VERCEL_URL || '')}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </SwiperSlide>
        ))}
      </CarouselComponent>
    </div>
  );
}
