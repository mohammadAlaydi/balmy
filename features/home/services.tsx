"use client";

import React from "react";
import { SwiperSlide } from "swiper/react";
import CarouselComponent from "@/components/carousel-component";
import useHome from "@/hooks/use-home";
import { BenefitItem } from "@/hooks/use-home"; 

export default function Services() {

  const { benefits } = useHome();

  return (
    <CarouselComponent
      spaceBetween={20}
      slidesPerView={1}
      containerClassName="services-carousel"
      breakpoints={{
        1000: { slidesPerView: 4, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        480: { slidesPerView: 2, spaceBetween: 15 },
        0: { slidesPerView: 1 },
      }}
    >
      {benefits.map((benefit: BenefitItem, index: number) => {
        const Icon = benefit.icon;
        return (
          <SwiperSlide key={index} className="px-5 py-10">
            <div className="flex justify-center">
              <Icon className="text-4xl text-primary" />
            </div>
            <div>
              <h2 className="text-center text-sm md:text-md lg:text-[20px] mt-2 font-semibold">
                {benefit.title}
              </h2>
              <p className="text-center text-gray-500 mt-2 text-sm md:text-lg">
                {benefit.description}
              </p>
            </div>
          </SwiperSlide>
        );
      })}
    </CarouselComponent>
  );
}
