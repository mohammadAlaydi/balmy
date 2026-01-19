"use client";

import React from "react";
import Image from "next/image";
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
      <div className="w-full">
        {/* <SectionTitle
          title={t("our-services")}
          titleStyle="text-center mb-1 text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900"
          subtitle={t("what-we-offer")}
        /> */}
        {/* <div className="flex justify-center mb-5">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </div> */}
        <CarouselComponent
          slidesPerView={1}
          spaceBetween={15}
          autoPlay
          containerClassName="services-carousel"
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 2,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 3,
            },

            1000: { slidesPerView: 3, spaceBetween: 15 },
            1200: { slidesPerView: 3, spaceBetween: 50 },
            1500: { slidesPerView: 3, spaceBetween: 140 },
          }}
        >
          {benefits.map((benefit: BenefitItem, index: number) => {
            return (
              <SwiperSlide key={index} className="px-2 py-8 h-auto">
                <div className="group h-full flex flex-col bg-white rounded-xl py-8 px-2  shadow-sm transition-all duration-300 border border-gray-100 max-h-[260px]">
                  <div className="flex justify-center mb-3">
                    <div className="relative rounded-xl md:rounded-2xl transition-colors duration-300 flex items-center justify-center">
                      <Image
                        src={benefit.icon}
                        alt={benefit.title}
                        width={53}
                        height={53}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-center flex-1 flex flex-col">
                    <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-1">
                      {benefit.title}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed flex-1 truncate">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </CarouselComponent>
      </div>
  );
}
