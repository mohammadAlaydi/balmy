import CarouselComponent from "@/components/carousel-component";
import React from "react";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function BannerCarousel({ sliders }: { sliders: any }) {
  return (
    <CarouselComponent
      containerClassName="w-full h-[40vh] sm:h-[50vh] md:h-[55vh] lg:h-[65vh] xl:h-[70vh]"
      spaceBetween={30}
      slidesPerView={1}
      pagination={true}
      autoPlay={false}
    >
      {sliders &&
        sliders?.length > 0 &&
        sliders?.map((slider: any, index: number) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div
              className="h-full w-full bg-no-repeat bg-center bg-[length:100%_100%] bg-scroll"
              style={{ backgroundImage: `url(${slider?.image_url})` }}
            >
              {/* <Image
            src={slider?.image_url}
            alt={slider?.title}
            fill
          /> */}
            </div>
          </SwiperSlide>
        ))}
    </CarouselComponent>
  );
}
