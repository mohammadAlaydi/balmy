"use client";

import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cart-slice";
import { FavouriteButton } from "@/components/favourite-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MdOutlineShoppingCart,
  MdOutlineShare,
  MdOutlineStar,
} from "react-icons/md";
import { ProductDetailsApiResponse } from "@/types/types";
import VariantSelector from "./variant-selector";
import { useProductVariants } from "@/hooks/use-product-variants";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";

interface SingleProductDetailsProps {
  product: ProductDetailsApiResponse["data"];
  className?: string;
  variantProps?: ReturnType<typeof useProductVariants>;
}

export default function SingleProductDetails({
  product,
  className,
  variantProps,
}: SingleProductDetailsProps) {
  const t = useTranslations("product-details");
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  // Use the variant management hook
  const {
    hasVariants,
    colorVariants,
    availableSizesForSelectedColor,
    currentVariant,
    selectedVariants,
    handleColorChange,
    handleSizeChange,
  } = variantProps ?? useProductVariants({ product });

  const handleAddToCart = () => {
    const productIdToAdd = currentVariant?.id || product.id;
    dispatch(addToCart({ productId: productIdToAdd }));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.short_description ?? undefined,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t("link-copied"), { duration: 2000 });
    }
  };

  const normalizePrice = (value: string | number | null | undefined): number | null => {
    if (value === null || value === undefined) return null;
    const n = typeof value === 'number' ? value : parseFloat(value);
    return Number.isFinite(n) ? n : null;
  };

  // Use current variant price if available, otherwise use product price
  // Pricing logic: prefer selected variant, otherwise derive from variants
  const variantPrice = normalizePrice(currentVariant?.price ?? null);
  const variantSpecial = normalizePrice(currentVariant?.special_price ?? null);
  const productPrice = normalizePrice(product.price);
  const productSpecial = normalizePrice(product.special_price);

  // If configurable and product price is null, compute min price from variants
  const minVariantPrice = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return null;
    const prices = product.variants
      .map(v => normalizePrice(v.special_price ?? v.price))
      .filter((n): n is number => n !== null);
    if (prices.length === 0) return null;
    return Math.min(...prices);
  }, [product.variants]);

  const effectivePrice =
    variantPrice ?? productPrice ?? minVariantPrice ?? 0;
  const effectiveSpecial = (() => {
    const sp = variantSpecial ?? productSpecial;
    return sp !== null && sp < effectivePrice ? sp : null;
  })();
  const hasDiscount = effectiveSpecial !== null;

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Product Title */}
      <div>
        <h1 className="text-[28px] lg:text-[28px] md:text-[24px] font-[800] md:font-[500] text-black mb-2 font-cairo">
          {product.name}
        </h1>
        <p className="text-[22px] lg:text-[22px] md:text-[18px] opacity-60 text-black font-cairo">
          {product.sku}
        </p>
      </div>

      {/* Price Section */}
      <div className="border-y border-gray-200 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-[28px] lg:text-[28px] md:text-[24px] font-[800] md:font-[500] text-[#D07A51] font-cairo">
            {(hasDiscount ? effectiveSpecial! : effectivePrice).toFixed(2)} {t("currency")}
          </div>
          {hasDiscount && (
            <>
              <div className="text-[20px] lg:text-[20px] md:text-[18px] text-gray-500 line-through font-cairo">
                {effectivePrice.toFixed(2)} {t("currency")}
              </div>
              <Badge className="bg-[#D07A51] text-white text-xs px-2 py-1 rounded">
                {t("discount")}
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <Badge
          className={`text-sm px-3 py-1 rounded ${
            currentVariant?.in_stock ?? product.in_stock
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          }`}
        >
          {currentVariant?.in_stock ?? product.in_stock
            ? t("in-stock")
            : t("out-of-stock")}
        </Badge>
      </div>

      {/* Rating */}
      {product.reviews.average_rating && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <MdOutlineStar
                key={i}
                className={`text-xl ${
                  i < Math.round(product.reviews.average_rating!)
                    ? "text-[#ffd700] fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviews.total} {t("reviews")})
          </span>
        </div>
      )}

      {/* Optional promo/label area (kept minimal to avoid duplication with full description) */}

      {/* Variant Selector */}
      {hasVariants && (
        <div>
          <VariantSelector
            colorVariants={colorVariants}
            availableSizesForSelectedColor={availableSizesForSelectedColor}
            selectedColor={selectedVariants.color}
            selectedSize={selectedVariants.size}
            onColorChange={handleColorChange}
            onSizeChange={handleSizeChange}
          />
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="text-[22px] lg:text-[22px] md:text-[18px] font-[600] md:font-[400] text-black mb-3 font-cairo">
          {t("quantity")}
        </h3>
        <div className="flex items-center ">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-[40px] h-[40px] cursor-pointer border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex justify-center items-center"
          >
            <TiMinus className="text-sm " />
          </button>
          <span className="w-[45px] text-center text-lg font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-[40px] h-[40px] cursor-pointer border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex justify-center items-center"
          >
            <FaPlus className="text-sm " />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={!(currentVariant?.in_stock ?? product.in_stock)}
          className="bg-black text-white hover:bg-white hover:text-black border border-black px-5 py-3 rounded-[5px] transition-all duration-300 font-cairo text-[20px] lg:text-[20px] md:text-[18px]"
        >
          <MdOutlineShoppingCart className="text-xl ml-2" />
          {t("add-to-cart")}
        </Button>

        <div className="flex gap-3">
          <FavouriteButton
            product={{
              id: currentVariant?.id || product.id,
              name: product.name,
              nameEn: product.name,
              price: (effectiveSpecial ?? effectivePrice),
              priceEn: `${(effectiveSpecial ?? effectivePrice).toFixed(2)} ج.م`,
              code: product.sku,
              images: [product.base_image.original_image_url],
              category: "",
              inStock: currentVariant?.in_stock ?? product.in_stock,
              rating: product.reviews.average_rating || 0,
              reviews: product.reviews.total,
            }}
            size="lg"
            className="flex-1 h-12 px-4"
          />

          <Button
            variant="outline"
            size="lg"
            onClick={handleShare}
            className="h-12 px-4 border-gray-300 hover:bg-gray-50"
          >
            <MdOutlineShare className="text-xl" />
          </Button>
        </div>
      </div>

      {/* Product Type Badge */}
      <div className="flex gap-2">
        <Badge variant="outline" className="text-sm">
          {product.type === "simple"
            ? t("simple-product")
            : t("customizable-product")}
        </Badge>
        {product.new && (
          <Badge className="bg-green-100 text-green-800 text-sm">
            {t("new")}
          </Badge>
        )}
        {product.featured && (
          <Badge className="bg-blue-100 text-blue-800 text-sm">
            {t("featured")}
          </Badge>
        )}
      </div>
    </div>
  );
}
