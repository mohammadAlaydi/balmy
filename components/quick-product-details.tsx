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
import { ApiProduct } from "@/types/types";
import LoadingSpinner from "./ui/loading-spinner";
import toast from "react-hot-toast";
import AuthModal from "./auth/auth-modal";

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
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);
  const [choosenVarianrID, setChoosenVarianrID] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const t = useTranslations("products");
  const dispatch = useAppDispatch();

  const { isLoading } = useSelector((state: any) => state.productDetails);
  const { increaseOrDecreaseLoading: cartLoading, status } = useSelector(
    (state: any) => state.cart
  );
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const baseImageUrl = getCurrentMainImage(product, 0);

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
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    const productId = product?.variants
      ? choosenVarianrID || product?.variants[0]?.id
      : product?.id;

    if (!productId) return;
    await dispatch(addToCart({ productId }));
    // Toasts are triggered centrally in the slice based on API response
  };
  const handleVariantSelect = (index: number) => {
    setSelectedVariantIndex(index);
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
        className={`text-sm px-3 py-1 rounded ${
          product.in_stock
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-red-100 text-red-800 border-red-200"
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
        <div className="flex items-center gap-3 my-1 transition-all duration-300">
          {/* Base image option */}
          {product?.variants && product.variants.length > 3 ? (
            <div className="items-center gap-3 hidden md:flex transition-all duration-300">
              {/* Variant images */}
              {product.variants.slice(0, 3).map((variant, index) => (
                <div
                  key={variant.id}
                  className="relative mb-3"
                  onClick={() => {
                    setChoosenVarianrID(variant?.id);
                  }}
                >
                  <Image
                    width={32}
                    height={32}
                    src={
                      variant.base_image?.original_image_url ||
                      "/assets/images/no-image.webp"
                    }
                    alt={`${product?.name || t("product")} ${t(
                      "variant-image"
                    )} ${index + 1}`}
                    className={`cursor-pointer transition-all duration-200 rounded-full h-[32px] w-[32px] ${
                      selectedVariantIndex === index ||
                      (selectedVariantIndex === null && index == 0)
                        ? "ring-2 ring-gray-300 scale-110"
                        : "hover:scale-105"
                    }`}
                    onClick={() => handleVariantSelect(index)}
                  />
                </div>
              ))}
              {product.variants.length > 3 && (
                <Badge className="bg-transparent text-primary  mb-3 ring-2 ring-gray-300 scale-110 w-[32px] h-[32px]  p-0 flex items-center rounded-full justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-xs">
                  +{product.variants.length - 3}
                </Badge>
              )}
            </div>
          ) : (
            product?.variants?.map((variant, index) => (
              <div
                key={index}
                className="justify-between items-center gap-3 w-full hidden md:flex"
              >
                <div className="relative mb-3">
                  <Image
                    width={32}
                    height={32}
                    src={
                      variant?.base_image?.original_image_url ||
                      "/assets/images/no-image.webp"
                    }
                    alt={`${product?.name || t("product")} ${t(
                      "variant-image"
                    )} 1`}
                    className="cursor-pointer transition-all duration-200 rounded-full ring-2 ring-gray-300 scale-110 h-[32px] w-[32px]"
                  />
                </div>
              </div>
            ))
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
          {cartLoading ? <LoadingSpinner size="sm" /> : "إضف للسلة"}
        </Button>
        <Link
          prefetch={true}
          href="/favourits"
          prefetch={true}
          className="text-nowrap md:text-sm text-xs bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300"
        >
          الذهاب للمفضلة
        </Link>
      </div>
      <Link
        href="/cart"
        prefetch={true}
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
      <AuthModal isOpen={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
}
