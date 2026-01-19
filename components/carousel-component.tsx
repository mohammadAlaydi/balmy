"use client";

import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

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
  swiperClassName,
  effect,
  autoplayDelay,
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
  swiperClassName?: string;
  effect?: string;
  autoplayDelay?: number;
}) {
  const modules = [];
  if (pagination) modules.push(Pagination);
  if (navigation) modules.push(Navigation);
  if (autoPlay) modules.push(Autoplay);
  if (effect === 'fade') modules.push(EffectFade);

  return (
    <div className={`${containerClassName}`}>
      <Swiper
        pagination={pagination ? { clickable: true } : false}
        navigation={navigation}
        modules={modules}
        className={`mySwiper w-full ${swiperClassName}`}
        spaceBetween={spaceBetween || 30}
        slidesPerView={slidesPerView || 1}
        breakpoints={breakpoints}
        autoplay={autoPlay ? { delay: autoplayDelay || 10000, disableOnInteraction: false } : false}
        autoHeight={!!autoHeight}
        effect={effect}
        fadeEffect={effect === 'fade' ? { crossFade: true } : undefined}
        style={{ width: '100%', height: autoHeight ? 'auto' : '100%' }}
      > 
        {children}
      </Swiper>
    </div>
  );
}
