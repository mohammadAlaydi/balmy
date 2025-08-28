import CarouselComponent from "@/components/carousel-component";
import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { TbArrowBack } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { PiSealCheck } from "react-icons/pi";
import { SwiperSlide } from "swiper/react";

export default function Services() {
  let benfits = [
    {
      icon: <TbArrowBack className="text-4xl" />,
      h2: "الاستبدال و الاسترجاع",
      p: "تقدر تسترجع أو تستبدل خلال 14 يوم بدون قلق",
    },
    {
      icon: <MdOutlineLocalShipping className="text-4xl" />,
      h2: " شحن مجاني",
      p: "أو الإستلام من اقرب فرع",
    },
    {
      icon: <BiSupport className="text-4xl" />,
      h2: " معك لحظة بلحظة",
      p: " خدمة عملاء متواصلة - تواصل معنا 24/7",
    },
    {
      icon: <PiSealCheck className="text-4xl" />,
      h2: "عضويتك ذهب",
      p: ".خصومات ونقاط حصرية بانتظارك",
    },
  ];
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
      {benfits.map((benfit, index) => (
        <SwiperSlide key={index} className="px-5 py-10">
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
