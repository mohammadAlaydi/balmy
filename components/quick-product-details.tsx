"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

import CarouselComponent from "./carousel-component";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Loading from "./loading";
import { getCurrentMainImage } from "@/static-data/static-data";
import { addToCart } from "@/store/slices/cart-slice";
import { useAppDispatch } from "@/store/hooks";

// Types
import { ApiProduct } from "@/types/types";

interface QuickProductDetailsProps {
  product: ApiProduct;
}

// Constants
const IMAGE_SIZES = {
  carousel: { width: 100, height: 100 },
  thumbnail: { width: 32, height: 32 },
  fallback: "/assets/images/no-image.webp",
} as const;

const MAX_VISIBLE_VARIANTS = 3;

export default function QuickProductDetails({
  product,
}: QuickProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const t = useTranslations("products");
  const dispatch = useAppDispatch();

  const isLoading = useSelector((state: any) => state.productDetails.isLoading);
  const baseImageUrl = getCurrentMainImage(product, 0);

  // Early returns
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

  // Handlers
  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id }));
  };

  const handleImageSelect = (index: number | null) => {
    setSelectedImage(index);
  };

  // Helper functions
  const renderProductImages = () => {
    const hasVariants = product.variants && product.variants.length > 0;

    return (
      <CarouselComponent
        slidesPerView={1}
        spaceBetween={10}
        containerClassName="w-full"
        navigation={true}
      >
        {hasVariants ? (
          product.variants!.map((variant, index) => (
            <SwiperSlide key={`${variant.id}-${index}`}>
              <Image
                src={baseImageUrl}
                alt={product.name}
                width={IMAGE_SIZES.carousel.width}
                height={IMAGE_SIZES.carousel.height}
                className="w-full object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide key={`product-${product.id}`}>
            <Image
              src={baseImageUrl}
              alt={product.name}
              width={IMAGE_SIZES.carousel.width}
              height={IMAGE_SIZES.carousel.height}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        )}
      </CarouselComponent>
    );
  };

  const renderProductHeader = () => (
    <div className="flex justify-between gap-2">
      <h2 className="font-[600] md:font-[650] md:text-sm text-xs overflow-hidden text-ellipsis whitespace-nowrap">
        {product.name}
      </h2>
      <p className="font-[600] md:font-[650] md:text-sm text-xs overflow-hidden text-ellipsis whitespace-nowrap">
        {product.sku}
      </p>
    </div>
  );

  const renderStockAndPrice = () => (
    <div className="flex justify-between gap-2">
      <p
        className={`text-xs md:text-sm ${
          product.in_stock ? "text-green-600" : "text-red-color"
        }`}
      >
        {product.in_stock ? "متوفر" : "غير متوفر"}
      </p>
      <p className="text-gray-color font-[600] md:font-[650] md:text-sm text-xs">
        {product.price || 0.0} {t("currency")}
      </p>
    </div>
  );

  const renderColorVariants = () => {
    if (!product.variants || product.variants.length === 0) return null;

    return (
      <div className="colors flex flex-col gap-3 flex-wrap">
        <h2 className="font-[600] md:font-[650] md:text-sm text-xs">
          اختر لون المنتج
        </h2>
        <div className="flex items-center gap-2 my-1 transition-all duration-300">
          {/* Base image option */}
          <div className="relative mb-3">
            <Image
              width={IMAGE_SIZES.thumbnail.width}
              height={IMAGE_SIZES.thumbnail.height}
              src={baseImageUrl || IMAGE_SIZES.fallback}
              alt={`${product.name} base`}
              className={`cursor-pointer transition-all duration-200 rounded-full ${
                selectedImage === null
                  ? "ring-2 ring-gray-400 scale-110"
                  : "hover:scale-105"
              }`}
              onClick={() => handleImageSelect(null)}
            />
          </div>
          {product.variants.length > MAX_VISIBLE_VARIANTS && (
            <Badge className="bg-transparent text-primary w-[32px] h-[32px] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-xs">
              +{product.variants.length - MAX_VISIBLE_VARIANTS}
            </Badge>
          )}
        </div>
      </div>
    );
  };



  const renderActionButtons = () => (
    <>
      <div className="flex gap-2">
        <Button
          onClick={handleAddToCart}
          className="text-nowrap md:text-sm text-xs bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300"
        >
          اضف للسلة
        </Button>
        <Link
          href="/favourits"
          className="text-nowrap md:text-sm text-xs bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300"
        >
          الذهاب للمفضلة
        </Link>
      </div>
      <Link
        href="/cart"
        className="text-nowrap md:text-sm text-xs bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300 text-center w-full"
      >
        عربة التسوق
      </Link>
    </>
  );

  return (
    <div className="flex flex-col gap-4 h-full items-center">
      {renderProductImages()}
      <div className="flex flex-col gap-4 h-full w-full">
        {renderProductHeader()}
        {renderStockAndPrice()}
        <div className="variant flex flex-col gap-5">
          {renderColorVariants()}
        </div>
      </div>
      {renderActionButtons()}
    </div>
  );
}
