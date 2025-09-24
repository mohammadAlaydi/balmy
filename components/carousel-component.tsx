"use client";

import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function CarouselComponent({
  spaceBetween,
  slidesPerView,
  children,
  containerClassName,
  breakpoints,
  pagination,
  navigation,
  autoPlay,
  autoHeight,
}: {
  spaceBetween: number;
  slidesPerView: number;
  children: React.ReactNode;
  containerClassName: string;
  breakpoints?: any;
  pagination?: boolean;
  navigation?: boolean;
  autoPlay?: boolean;
  autoHeight?: boolean;
}) {
  const modules = [];
  if (pagination) modules.push(Pagination);
  if (navigation) modules.push(Navigation);
  if (autoPlay) modules.push(Autoplay);

  return (
    <div className={`${containerClassName}`}>
      <Swiper
        pagination={pagination ? { clickable: true } : false}
        navigation={navigation}
        modules={modules}
        className="mySwiper w-full"
        spaceBetween={spaceBetween || 30}
        slidesPerView={slidesPerView || 1}
        breakpoints={breakpoints}
        autoplay={autoPlay ? { delay: 5000, disableOnInteraction: false } : false}
        autoHeight={!!autoHeight}
        style={{ width: '100%', height: autoHeight ? 'auto' : '100%' }}
      > 
        {children}
      </Swiper>
    </div>
  );
}
