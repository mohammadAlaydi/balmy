"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
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

const IMAGE_SIZES = {
  main: { width: 500, height: 500 },
  thumbnail: { width: 32, height: 32 },
  fallback: "/assets/images/no-image.webp",
} as const;

export default function QuickProductDetails({
  product,
}: QuickProductDetailsProps) {
  
  const t = useTranslations("products");
  const dispatch = useAppDispatch();

  const { isLoading } = useSelector((state: any) => state.productDetails);
  const { increaseOrDecreaseLoading: cartLoading } = useSelector(
    (state: any) => state.cart
  );
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);
  const [choosenVarianrID, setChoosenVarianrID] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAddProductId, setPendingAddProductId] = useState<number | null>(
    null
  );

  // 👇 this state stores the current main image
  const [mainImage, setMainImage] = useState<string>(
    getCurrentMainImage(product, 0) || IMAGE_SIZES.fallback
  );

  if (isLoading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  if (!product) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <p className="text-gray-500">{t("no-product-details")}</p>
      </div>
    );
  }

  // 🔹 Handle Add to Cart
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      const pid = product?.variants
        ? choosenVarianrID || product?.variants[0]?.id
        : product?.id;
      if (pid) setPendingAddProductId(Number(pid));
      setShowAuthModal(true);
      return;
    }

    const productId = product?.variants
      ? choosenVarianrID || product?.variants[0]?.id
      : product?.id;

    if (!productId) return;
    await dispatch(addToCart({ productId }));
    toast.success(t("added-to-cart"));
  };

  // 🔹 Handle variant click
  const handleVariantSelect = (index: number) => {
    setSelectedVariantIndex(index);
    const selectedVariant = product?.variants?.[index];
    const imageUrl =
      selectedVariant?.base_image?.original_image_url || IMAGE_SIZES.fallback;
    setMainImage(imageUrl);
    setChoosenVarianrID(selectedVariant?.id);
  };

  // 🔹 Main product image display
  const renderProductImage = () => (
    <div className="w-full flex justify-center items-center">
      <Image
        src={mainImage}
        alt={product.name}
        width={IMAGE_SIZES.main.width}
        height={IMAGE_SIZES.main.height}
        className="w-full  object-cover rounded-xl transition-all duration-300"
      />
    </div>
  );

  // 🔹 Header
  const renderProductHeader = () => (
    <div className="flex justify-between gap-2 w-full">
      <h2 className="font-semibold text-sm md:text-base truncate">
        {product.name}
      </h2>
      <p className="font-semibold text-sm md:text-base truncate">
        {product.sku}
      </p>
    </div>
  );

  // 🔹 Stock & Price
  const renderStockAndPrice = () => (
    <div className="flex justify-between gap-2 w-full flex-wrap">
      <p
        className={`text-sm px-3 py-1 rounded ${
          product.in_stock
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-red-100 text-red-800 border-red-200"
        }`}
      >
        {product.in_stock ? t("in-stock") : t("out-of-stock")}
      </p>
      <p className="text-gray-700 font-semibold text-sm md:text-base">
        {product.price || 0.0} <i className="icon-rial"></i>
      </p>
    </div>
  );

  // 🔹 Variants (thumbnails)
  const renderColorVariants = () => {
    if (!product.variants || product.variants.length === 0) return null;

    return (
      <div className="colors flex flex-col gap-3 flex-wrap w-full">
        <h2 className="font-semibold text-sm md:text-base">
          {t("choose-color")}
        </h2>
        <div className="flex items-center gap-4 my-1 flex-wrap">
          {product.variants.map((variant, index) => (
            <div key={variant.id} className="relative w-fit">
              <Image
                width={IMAGE_SIZES.thumbnail.width}
                height={IMAGE_SIZES.thumbnail.height}
                src={
                  variant.base_image?.original_image_url || IMAGE_SIZES.fallback
                }
                alt={`${product.name} variant ${index + 1}`}
                className={`cursor-pointer transition-all duration-200 rounded-full h-[32px] w-[32px] ${
                  selectedVariantIndex === index
                    ? "ring-2 ring-gray-200 scale-110"
                    : "hover:scale-105 ring-1 ring-gray-200"
                }`}
                onClick={() => handleVariantSelect(index)}
              />
            </div>
          ))}

          {product.variants.length > 3 && (
            <Badge className="bg-transparent text-primary ring-1 ring-gray-300 rounded-full w-[32px] h-[32px] flex items-center justify-center text-xs">
              +{product.variants.length - 3}
            </Badge>
          )}
        </div>
      </div>
    );
  };

  // 🔹 Action buttons
  const renderActionButtons = () => (
    <>
      <div className="flex gap-2 w-full justify-center items-center flex-wrap">
        <Button
          onClick={handleAddToCart}
          className="text-nowrap text-xs md:text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-black/85 transition-all duration-300"
        >
          {cartLoading ? <LoadingSpinner size="sm" /> : t("add-to-cart")}
        </Button>
        <Link
          prefetch={true}
          href="/favourits"
          className="text-nowrap text-xs md:text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-black/85 transition-all duration-300 text-center"
        >
          {t("go-to-favourites")}
        </Link>
      </div>
      <Link
        href="/cart"
        prefetch={true}
        className="text-nowrap text-xs md:text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-black/85 transition-all duration-300 text-center w-full"
      >
        {t("cart")}
      </Link>
    </>
  );

  return (
    <div className="flex flex-col gap-4 h-full items-center overflow-y-scroll">
      {renderProductImage()}
      <div className="flex flex-col gap-4 h-full w-full">
        {renderProductHeader()}
        {renderStockAndPrice()}
        {renderColorVariants()}
      </div>
      {renderActionButtons()}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={(open) => {
          setShowAuthModal(open);
          if (!open) setPendingAddProductId(null);
        }}
        onAuthenticated={async () => {
          const pid =
            pendingAddProductId ??
            (product?.variants
              ? choosenVarianrID || product?.variants[0]?.id
              : product?.id);
          if (!pid) return;
          await dispatch(addToCart({ productId: Number(pid) }));
          toast.success(t("added-to-cart"));
          setPendingAddProductId(null);
        }}
      />
    </div>
  );
}
