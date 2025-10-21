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
      containerClassName="categories-carousel h-auto"
      autoHeight
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        301: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        600: {
          slidesPerView: 3,
          spaceBetween: 8,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 8,

        },
        1000: { slidesPerView: 3, spaceBetween: 15 },
        1200: { slidesPerView: 4, spaceBetween: 15 },
        1201: { slidesPerView: 5, spaceBetween: 15 },
      }}
    >
      {categories &&
        categories?.length > 0 &&
        categories?.map(
          (category: Category, index: number) =>
            category?.name != "Root" && (
              <SwiperSlide key={index}>
                <Link
                  href={`/category/${category.slug}/${category.id}`}
                  className="overflow-hidden cursor-pointer"
                >
                  <div>
                    {(() => {
                      const rawBannerUrl =
                        typeof (category as any)?.banner_url === "string"
                          ? (category as any).banner_url.trim()
                          : "";
                      const isLikelyValidUrl =
                        rawBannerUrl.startsWith("http://") ||
                        rawBannerUrl.startsWith("https://") ||
                        rawBannerUrl.startsWith("/");
                      const imageSrc = isLikelyValidUrl
                        ? rawBannerUrl
                        : "/assets/images/no-image.webp";
                      return (
                        <Image
                          src={imageSrc}
                          width={250}
                          height={250}
                          className="rounded-full m-auto transform hover:scale-[1.02] transition-all duration-1000 "
                          alt={category.name || "category"}
                        />
                      );
                    })()}
                  </div>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                  <h2 className="text-center text-lg md:text-xl font-semibold text-primary mt-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-400 text-sm text-center">
                    {category?.meta_title}
                  </p>
                </div>
              </SwiperSlide>
            )
        )}
    </CarouselComponent>
  );
}
