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

export default function Categories({ categories }: { categories: any }) {
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
      {categories && categories?.length > 0 && categories?.map((category: Category, index: number) => (
        <SwiperSlide key={index}>
          <Link href={`${category.link}`} prefetch={true}>
            <div className="overflow-hidden rounded-full cursor-pointer">
              <Image
                src={category?.image_url}
                width={250}
                height={250}
                className="rounded-full m-auto transform hover:scale-[1.04] transition-all duration-1000"
                alt={category.name}
              />
            </div>
          </Link>
          <div>
            <h2 className="text-center text-lg md:text-xl font-semibold text-primary mt-2">
              {category.name}
            </h2>
          </div>
        </SwiperSlide>
      ))}
    </CarouselComponent>
  );
}
