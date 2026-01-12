"use client";

import React from "react";
import { SwiperSlide } from "swiper/react";
import CarouselComponent from "@/components/carousel-component";
import useHome from "@/hooks/use-home";
import { BenefitItem } from "@/hooks/use-home";
import SectionTitle from "@/components/section-title";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("home");
  const { benefits } = useHome();

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white pt-10">
      <div className="w-full px-4">
        <SectionTitle
          title={t("our-services")}
          titleStyle="text-center mb-3 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900"
          subtitle={t("what-we-offer")}
        />
        <div className="flex justify-center mb-10">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </div>
        <CarouselComponent
          slidesPerView={1}
          containerClassName="services-carousel"
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween : 2
            },
            400: {
              slidesPerView: 2,
              spaceBetween : 3

            },
           
          
            1000: { slidesPerView: 3, spaceBetween: 15 },
            1200: { slidesPerView: 3, spaceBetween: 15 },
          }}
        >
          {benefits.map((benefit: BenefitItem, index: number) => {
            const Icon = benefit.icon;
            return (
              <SwiperSlide key={index} className="px-2 py-8 h-auto">
                <div className="group h-full flex flex-col bg-white rounded-xl py-4 px-2  shadow-sm transition-all duration-300 border border-gray-100 max-h-[280px]">
                  <div className="flex justify-center mb-4 md:mb-5">
                    <div className="relative p-3 sm:p-4 bg-primary/5 rounded-xl md:rounded-2xl group-hover:bg-primary/10 transition-colors duration-300">
                      <Icon className="text-3xl sm:text-4xl md:text-5xl text-primary" />
                    </div>
                  </div>
                  <div className="text-center flex-1 flex flex-col">
                    <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                      {benefit.title}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed flex-1 min-h-[60px]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </CarouselComponent>
      </div>
    </div>
  );
}
