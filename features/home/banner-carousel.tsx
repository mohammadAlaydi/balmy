import CarouselComponent from "@/components/carousel-component";
import React from "react";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function BannerCarousel({ sliders }: { sliders: any }) {
  const placeholderSlides = [
    { image_url: "/assets/images/banner.jpg", title: "Placeholder Banner" },
  ];

  const items = Array.isArray(sliders) && sliders.length > 0 ? sliders : placeholderSlides;

  return (
    <div className="w-full min-h-[40vh] sm:min-h-[50vh] md:min-h-[55vh] lg:min-h-[65vh] xl:min-h-[70vh]">
      <CarouselComponent
        containerClassName="w-full h-auto"
        spaceBetween={30}
        slidesPerView={1}
        pagination={true}
        autoPlay={false}
        autoHeight
      >
        {items.map((slider: any, index: number) => (
            <SwiperSlide key={index} className="w-full h-full">
              <div
                className="w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/6] xl:aspect-[16/6] bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `url(${slider?.image_url})` }}
              >
                {/* Content can go here */}
              </div>
            </SwiperSlide>
          ))}
      </CarouselComponent>
    </div>
  );
}
