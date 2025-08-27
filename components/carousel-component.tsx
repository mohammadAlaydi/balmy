"use client";

import React from "react";
import { Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function CarouselComponent({
  spaceBetween,
  slidesPerView,
  children,
  containerClassName,
  breakpoints,
}: {
  spaceBetween: number;
  slidesPerView: number;
  children: React.ReactNode;
  containerClassName: string;
  breakpoints?: any;
}) {
  return (
    <div className={`${containerClassName}`}>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper h-full"
        spaceBetween={spaceBetween || 30}
        slidesPerView={slidesPerView || 1}
        breakpoints={breakpoints}
      >
        {children}
      </Swiper>
    </div>
  );
}
