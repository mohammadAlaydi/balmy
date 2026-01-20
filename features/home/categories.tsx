import CarouselComponent from "@/components/carousel-component";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { isEnvagloCdnUrl, normalizeRemoteImageUrl } from "@/lib/utils";

interface Category {
  id?: string | number;
  name?: string;
  meta_title?: string;
  banner_url?: string;
}

export default function Categories({ categories , locale }: { categories: any  , locale : string}) {
  return (
    <CarouselComponent
    navigation={true}
      spaceBetween={20}
      slidesPerView={1}
      centeredSlides
      centerInsufficientSlides
      centeredSlidesBounds
      containerClassName={`categories-carousel h-auto ${
        locale === "ar" ? "rtl" : "ltr"
      }`}
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
        1000: { slidesPerView: 4, spaceBetween: 15 },
        1201: { slidesPerView: 5, spaceBetween: 20 },
        1501: { slidesPerView: 6, spaceBetween: 30 },
      }}
    >
      {categories &&
        categories?.length > 0 &&
        categories?.map(
          (category: Category, index: number) =>
            category?.name != "Root" && (
              <SwiperSlide key={index}>
                <Link
                  href={`/category/${category.id}`}
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
                      const normalized = isLikelyValidUrl
                        ? normalizeRemoteImageUrl(rawBannerUrl)
                        : undefined;
                      const imageSrc =
                        normalized || "/assets/images/no-image.webp";
                      return (
                        <div className="relative w-full aspect-square rounded-full overflow-hidden m-auto">
                          <Image
                            src={imageSrc}
                            alt={category.name || "category"}
                            fill
                            className="object-cover hover:scale-[1.02] transition-all duration-1000"
                            unoptimized={isEnvagloCdnUrl(imageSrc)}
                          />
                        </div>
                      );
                    })()}
                  </div>
                </Link>
                <div className="flex flex-col gap-1 md:gap-2">
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
