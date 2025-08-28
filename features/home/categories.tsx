import CarouselComponent from "@/components/carousel-component";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SwiperSlide } from "swiper/react";

interface Category {
  src: string;
  h2: string;
  p: string;
  link: string;
}

export default function Categories() {
  let MY_CATEGORIES: Category[] = [
    {
      src: "/assets/images/category-01.webp",
      h2: " النعال العربي",
      p: "أصالة وأناقة مضمونة",
      link: "/products/slippers",
    },
    {
      src: "/assets/images/category-01.webp",
      h2: "الزي السعودي",
      p: "شموخ في التفاصيل",
      link: "/products/saudi-dress",
    },
    {
      src: "/assets/images/category-01.webp",
      h2: "الملابس الشتوية",
      p: "دفء بأسلوب راقٍ",
      link: "/products/winter-supplies",
    },
    {
      src: "/assets/images/category-01.webp",
      h2: "الأحذية الرياضية",
      p: "فخامة تليق بك",
      link: "/products/sports-shoes",
    },
    {
      src: "/assets/images/category-01.webp",
      h2: "الاكسسوارات",
      p: "لمسات تكمل طلتك",
      link: "/products/accessories",
    },
  ];
  return (
    <CarouselComponent
      spaceBetween={20}
      slidesPerView={1}
      containerClassName="categories-carousel h-fit"
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        301: {
          slidesPerView: 2,
        },
        600: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 3,
        },
        1000: { slidesPerView: 3, spaceBetween: 20 },
        1200: { slidesPerView: 4, spaceBetween: 20 },
        1201: { slidesPerView: 5, spaceBetween: 20 },
      }}
    >
      {MY_CATEGORIES?.map((category: Category, index: number) => (
        <SwiperSlide key={index}>
          <Link href={`${category.link}`}>
            <div className="overflow-hidden rounded-full cursor-pointer">
              <Image
                src={category.src}
                width={250}
                height={250}
                className="rounded-full m-auto transform hover:scale-[1.04] transition-all duration-1000"
                alt={category.h2}
              />
            </div>
          </Link>
          <div>
            <h2 className="text-center text-lg md:text-xl font-semibold text-primary mt-2">
              {category.h2}
            </h2>
            {category.p && (
              <p className="text-sm md:text-md text-center text-gray-color mt-1 text-nowrap">
                {category.p}
              </p>
            )}
          </div>
        </SwiperSlide>
      ))}
    </CarouselComponent>
  );
}
