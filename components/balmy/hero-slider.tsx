"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

export type BannerImage = {
    id: number;
    url: string;
    name?: string;
    dominantColor?: string;
    bannerType?: string;
    slider_path?: string;
    redirect_data?: {
        type: "product" | "category" | "external" | string;
        id?: number;
        url?: string;
    };
};

export type HeroSliderProps = {
    banners?: BannerImage[];
};

export default function HeroSlider({ banners }: HeroSliderProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const pathname = usePathname();

    // Get current locale from pathname
    const locale = pathname?.split("/")[1] || "ar";

    // Autoplay plugin
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    // Generate the correct link based on redirect_data
    const getSlideLink = (banner: BannerImage): string | null => {
        const redirect = banner.redirect_data;

        if (!redirect) return null;

        switch (redirect.type) {
            case "product":
                return redirect.id ? `/${locale}/product/${redirect.id}` : null;
            case "category":
                return redirect.id ? `/${locale}/category/${redirect.id}` : null;
            case "external":
                return redirect.url || banner.slider_path || null;
            default:
                // If there's a slider_path, use it as external link
                return banner.slider_path || null;
        }
    };

    // Check if link is external
    const isExternalLink = (banner: BannerImage): boolean => {
        return banner.redirect_data?.type === "external" ||
            (banner.slider_path?.startsWith("http") ?? false);
    };

    if (!banners || banners.length === 0) {
        return (
            <section className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] bg-gradient-to-br from-pink-100 to-rose-200 -mt-[54px]">
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] -mt-[54px]">
            <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                className="w-full h-full"
                opts={{
                    loop: true,
                    align: "start",
                }}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="h-full -ml-0">
                    {banners.map((banner, index) => {
                        const link = getSlideLink(banner);
                        const external = isExternalLink(banner);

                        const slideContent = (
                            <div
                                className="relative w-full h-[500px] md:h-[700px] lg:h-[800px]"
                                style={{ backgroundColor: banner.dominantColor || "#f5f5f5" }}
                            >
                                <Image
                                    src={banner.url}
                                    alt={banner.name || `Banner ${index + 1}`}
                                    fill
                                    priority={index === 0}
                                    className="object-cover object-center"
                                    sizes="100vw"
                                />
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </div>
                        );

                        return (
                            <CarouselItem key={banner.id} className="pl-0 h-full">
                                {link ? (
                                    external ? (
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full h-full cursor-pointer"
                                        >
                                            {slideContent}
                                        </a>
                                    ) : (
                                        <Link href={link} className="block w-full h-full cursor-pointer">
                                            {slideContent}
                                        </Link>
                                    )
                                ) : (
                                    slideContent
                                )}
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                {/* Navigation Arrows */}
                {banners.length > 1 && (
                    <>
                        <button
                            onClick={() => api?.scrollPrev()}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
                        </button>
                        <button
                            onClick={() => api?.scrollNext()}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
                        </button>
                    </>
                )}

                {/* Dots Indicator */}
                {banners.length > 1 && (
                    <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${current === index + 1
                                        ? "bg-white w-6 md:w-8"
                                        : "bg-white/50 hover:bg-white/80"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </Carousel>
        </section>
    );
}
