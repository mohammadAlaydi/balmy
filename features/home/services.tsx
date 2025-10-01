"use client";

import CarouselComponent from "@/components/carousel-component";
import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { PiSealCheck } from "react-icons/pi";
import { SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";
import { TfiBackLeft } from "react-icons/tfi";

export default function Services() {
  const t = useTranslations("home");
  let benfits = [
    {
      icon: <TfiBackLeft className="text-4xl text-primary" />,
      h2: t("return-and-exchange"),
      p: t("return-and-exchange-desc"),
    },
    {
      icon: <MdOutlineLocalShipping className="text-4xl text-primary" />,
      h2: t("free-shipping"),
      p: t("free-shipping-desc"),
    },
    {
      icon: <BiSupport className="text-4xl text-primary" />,
      h2: t("always-with-you"),
      p: t("always-with-you-desc"),
    },
    {
      icon: <PiSealCheck className="text-4xl text-primary" />,
      h2: t("gold-membership"),
      p: t("gold-membership-desc"),
    },
  ];

  return (
    <CarouselComponent
      spaceBetween={20}
      slidesPerView={1}
      containerClassName="services-carousel my-5"
      breakpoints={{
        1000: { slidesPerView: 4, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        480: { slidesPerView: 2, spaceBetween: 15 },
        0: { slidesPerView: 1 },
      }}
    >
      {benfits.map((benfit, index) => (
        <SwiperSlide key={index} className="px-5 py-10 ">
          <div className="flex justify-center">{benfit.icon}</div>
          <div>
            <h2 className="text-center text-sm md:text-md lg:text-[20px] mt-2">
              {" "}
              {benfit.h2}
            </h2>
            <p className="text-center text-gray-color mt-2 text-sm md:text-lg">
              {" "}
              {benfit.p}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </CarouselComponent>
  );
}
