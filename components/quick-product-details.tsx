"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import CarouselComponent from "./carousel-component";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import Loading from "./loading";

export default function QuickProductDetails({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const isLoading = useSelector((state: any) => state.productDetails.isLoading);

  // Set loaded state after a short delay to prevent premature closing
  useEffect(() => {
    if (product && !isLoading) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [product, isLoading]);

  // Handle user interaction to prevent auto-close
  const handleInteraction = () => {
    setIsInteracting(true);
    // Reset interaction state after 2 seconds
    setTimeout(() => setIsInteracting(false), 2000);
  };

  if (isLoading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  if (!product) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <p className="text-gray-500">No product details available</p>
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col gap-4 h-full items-center"
      onMouseEnter={handleInteraction}
      onMouseLeave={handleInteraction}
      onClick={handleInteraction}
    >
      <CarouselComponent
        slidesPerView={1}
        spaceBetween={10}
        containerClassName="w-full"
        navigation={true}
      >
        {product?.variants?.map((product: any) => (
          <SwiperSlide key={product?.id}>
            <Image
              src={product?.base_image?.original_image_url}
              alt={product?.name}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </CarouselComponent>
      <div className="flex flex-col gap-4 h-full w-full">
        <h2 className="text-2xl font-[650]">{product?.name}</h2>
        <p className="text-lg text-gray-color">{product?.sku}</p>
        <p className="text-lg text-gray-color">{product?.price} ج.م</p>
        <div className="variant flex flex-col gap-5">
          {product?.variants && product?.variants?.length > 0 && (
            <div className="colors flex flex-col gap-3 flex-wrap">
              <h2 className="text-lg font-[650]">اختر لون المنتج</h2>
              <div>
                {product?.variants && product?.variants?.length > 0 && (
                  <div className="flex items-center gap-2 my-1 hidden md:flex transition-all duration-300">
                    {/* Base image option */}
                    <div className="relative mb-3">
                      <Image
                        width={32}
                        height={32}
                        src={
                          product?.base_image?.original_image_url ||
                          "/assets/images/product-card.jpg"
                        }
                        alt={`${product?.name || "Product"} base`}
                        className={`cursor-pointer transition-all duration-200 rounded-sm ${
                          selectedImage === null
                            ? "ring-2 ring-gray-400 scale-110"
                            : "hover:scale-105"
                        }`}
                        onClick={() => setSelectedImage(null)}
                      />
                    </div>
                    {/* Variant images */}
                    {product.variants.slice(0, 3).map((variant: any, index: number) => (
                      <div key={variant.id || index} className="relative mb-3">
                        <Image
                          width={32}
                          height={32}
                          src={
                            variant.base_image?.original_image_url ||
                            product?.base_image?.original_image_url ||
                            "/assets/images/product-card.jpg"
                          }
                          alt={`${product?.name || "Product"} variant ${
                            index + 1
                          }`}
                          className={`cursor-pointer transition-all duration-200 rounded-sm ${
                            selectedImage === index + 1
                              ? "ring-2 ring-gray-400 scale-110"
                              : "hover:scale-105"
                          }`}
                          onClick={() => setSelectedImage(index + 1)}
                        />
                      </div>
                    ))}
                    {product.variants.length > 3 && (
                      <Badge className="bg-transparent text-primary w-[32px] h-[32px] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-xs">
                        +{product.variants.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {product?.variants &&
            product?.variants?.length > 0 &&
            product?.variants?.map(
              (variant: any) =>
                variant.size && (
                  <div className="thickness flex flex-col gap-3 flex-wrap">
                    <h2 className="text-lg font-[650]">اختر مقاس المنتج</h2>
                    <div className="flex gap-2">
                      <Badge className="w-10 h-10 p-2  rounded-md border border-black border-2 border-inset rounded-md flex justify-center items-center cursor-pointer bg-transparent text-black">
                        {variant?.size}
                      </Badge>
                    </div>
                  </div>
                )
            )}

          {product?.variants &&
            product?.variants?.length > 0 &&
            product?.variants?.map(
              (variant: any) =>
                variant.thickness && (
                  <div className="thickness flex flex-col gap-3 flex-wrap">
                    <h2 className="text-lg font-[650]">اختر سمك المنتج</h2>
                    <div className="flex gap-2">
                      <Badge className="w-10 h-10 p-2  rounded-md border border-black border-2 border-inset rounded-md flex justify-center items-center cursor-pointer bg-transparent text-black">
                        {variant?.thickness}
                      </Badge>
                    </div>
                  </div>
                )
            )}
        </div>
        <p className="text-sm text-gray-color">متوفر في المخزن</p>
      </div>
      <div className="flex gap-2">
        <Link
          href="/cart"
          className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300"
        >
          اضف للسلة
        </Link>
        <Link
          href="/favourits"
          className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300"
        >
          الذهاب للمفضلة
        </Link>
      </div>
      <Link
        href="/favourits"
        className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300 text-center w-full"
      >
        عربة التسوق
      </Link>
    </div>
  );
}
