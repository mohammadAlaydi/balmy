"use client";

import React, { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/store/hooks";
import {
  addToCart,
  applyLocalQuantityDelta,
  updateCartQuantity,
} from "@/store/slices/cart-slice";
import { FavouriteButton } from "@/components/favourite-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// toast is already imported above for link sharing
import { MdOutlineShoppingCart, MdOutlineShare } from "react-icons/md";
import StarRating from "../react-stars";
import { ProductDetailsApiResponse } from "@/types/types";
import VariantSelector from "../variant-selector";
import { useProductVariants } from "@/hooks/use-product-variants";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { useSelector } from "react-redux";
import AuthModal from "../auth/auth-modal";
import toast from "react-hot-toast";

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
  const tProducts = useTranslations("products");
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAddProductId, setPendingAddProductId] = useState<number | null>(
    null
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const {
    data: cartData,
    increaseOrDecreaseResponse,
    increaseOrDecreaseLoading,
  } = useSelector((state: any) => state.cart);

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

  const handleUpdateQuantity = async (productId: number, qtyChange: number) => {
    try {
      setLoadingProductId(productId);
      await dispatch(
        addToCart({
          productId,
          productQTY: qtyChange,
        })
      );
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      const targetId = currentVariant?.product_id || product.product_id;
      if (targetId) setPendingAddProductId(Number(targetId));
      setShowAuthModal(true);
      return;
    }

    const productIdToAdd = currentVariant?.product_id || product.product_id;
    if (!productIdToAdd) return;

    try {
      setIsAddingToCart(true);
      const promise = dispatch(
        addToCart({ productId: productIdToAdd, productQTY: quantity })
      );

      if (typeof promise?.unwrap === "function") {
        await promise.unwrap();
      } else {
        await promise;
      }

      toast.success(tProducts("added-to-cart"));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(errorMessage || tProducts("failed-to-add-to-cart"));
    } finally {
      setIsAddingToCart(false);
    }
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

  const normalizePrice = (
    value: string | number | null | undefined
  ): number | null => {
    if (value === null || value === undefined) return null;
    const n = typeof value === "number" ? value : parseFloat(value);
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
      .map((v) => normalizePrice(v.special_price ?? v.price))
      .filter((n): n is number => n !== null);
    if (prices.length === 0) return null;
    return Math.min(...prices);
  }, [product.variants]);

  const effectivePrice = variantPrice ?? productPrice ?? minVariantPrice ?? 0;
  const effectiveSpecial = (() => {
    const sp = variantSpecial ?? productSpecial;
    return sp !== null && sp < effectivePrice ? sp : null;
  })();
  const hasDiscount = effectiveSpecial !== null;

  // Derive quantity already in cart for this product (if present)
  const targetProductId = useMemo(
    () => currentVariant?.product_id || product.product_id,
    [currentVariant?.product_id, product.product_id]
  );

  const cartQuantityForProduct = useMemo(() => {
    if (!targetProductId) return null;
    const fromStore = increaseOrDecreaseResponse?.data?.items?.find(
      (i: any) => i?.additional?.product_id === Number(targetProductId)
    )?.quantity;
    const fromCart = cartData?.data?.items?.find(
      (i: any) =>
        i?.additional?.product_id === Number(targetProductId) ||
        i?.product?.product_id === Number(targetProductId)
    )?.quantity;
    const candidate = fromStore ?? fromCart;
    if (candidate == null) return null;
    const n =
      typeof candidate === "string" ? parseInt(candidate, 10) : candidate;
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [cartData, increaseOrDecreaseResponse, targetProductId]);

  // Use cart quantity if product is already in cart, otherwise use local quantity
  const displayedQuantity = cartQuantityForProduct ?? quantity;

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
          <div className="text-[28px] lg:text-[28px] md:text-[24px] font-[800] md:font-[500] text-red-500 font-cairo">
            {(hasDiscount ? effectiveSpecial! : effectivePrice).toFixed(2)}{" "}
            <i className="icon-rial"></i>
          </div>
          {hasDiscount && (
            <>
              <div className="text-[20px] lg:text-[20px] md:text-[18px] text-gray-500 line-through font-cairo">
                {effectivePrice.toFixed(2)} <i className="icon-rial"></i>
              </div>
              <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded">
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
          <StarRating
            rating={product.reviews.average_rating}
            edit={false}
            inline
          />
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
            onClick={() => {
              const targetId = currentVariant?.product_id || product.product_id;
              if (!targetId) return;

              const isLoading =
                loadingProductId === Number(targetId) ||
                increaseOrDecreaseLoading;
              if (isLoading) {
                toast.error(t("operation-in-progress"));
                return;
              }

              if (cartQuantityForProduct && cartQuantityForProduct > 1) {
                // Product is already in cart, decrease quantity
                handleUpdateQuantity(Number(targetId), -1);
              } else if (cartQuantityForProduct === 1) {
                // Don't allow decreasing below 1
                return;
              } else {
                // Product not in cart, just update local quantity
                setQuantity((q) => Math.max(1, q - 1));
              }
            }}
            className={`w-[40px] h-[40px] cursor-pointer border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex justify-center items-center ${
              loadingProductId ===
                Number(currentVariant?.product_id || product.product_id) ||
              increaseOrDecreaseLoading ||
              displayedQuantity <= 1
                ? "text-gray-400"
                : ""
            }`}
            disabled={displayedQuantity <= 1}
          >
            <TiMinus className="text-sm " />
          </button>
          <span className="w-[45px] text-center text-lg font-medium">
            {displayedQuantity}
          </span>
          <button
            onClick={() => {
              const targetId = currentVariant?.product_id || product.product_id;
              if (!targetId) return;

              const isLoading =
                loadingProductId === Number(targetId) ||
                increaseOrDecreaseLoading;
              if (isLoading) {
                toast.error(t("operation-in-progress"));
                return;
              }

              if (cartQuantityForProduct) {
                // Product is already in cart, increase quantity
                handleUpdateQuantity(Number(targetId), 1);
              } else {
                // Product not in cart, just update local quantity
                setQuantity((q) => q + 1);
              }
            }}
            className={`w-[40px] h-[40px] cursor-pointer border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex justify-center items-center ${
              loadingProductId ===
                Number(currentVariant?.product_id || product.product_id) ||
              increaseOrDecreaseLoading
                ? "text-gray-400"
                : ""
            }`}
          >
            <FaPlus className="text-sm " />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={
            !(currentVariant?.in_stock ?? product.in_stock) || isAddingToCart
          }
          className="bg-black text-white hover:bg-black/75 hover:text-white border border-black px-5 py-3 rounded-[5px] transition-all duration-300 font-cairo text-[20px] lg:text-[20px] md:text-[18px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdOutlineShoppingCart className="text-xl ml-2" />
          <Badge className="text-base bg-transparent">
            {" "}
            {isAddingToCart ? t("adding-to-cart") : t("add-to-cart")}
          </Badge>
        </Button>

        <div className="flex gap-3">
          <FavouriteButton
            product={product}
            size="lg"
            className="flex-1 h-12 px-4 flex justify-center items-center cursor-pointer"
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
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={(open) => {
          setShowAuthModal(open);
          if (!open) setPendingAddProductId(null);
        }}
        onAuthenticated={async () => {
          const targetId =
            pendingAddProductId ||
            currentVariant?.product_id ||
            product.product_id;
          if (!targetId) return;

          try {
            setIsAddingToCart(true);
            const promise = dispatch(
              addToCart({ productId: Number(targetId), productQTY: quantity })
            );

            if (typeof promise?.unwrap === "function") {
              await promise.unwrap();
            } else {
              await promise;
            }

            toast.success(tProducts("added-to-cart"));
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : String(error);
            toast.error(errorMessage || tProducts("failed-to-add-to-cart"));
          } finally {
            setIsAddingToCart(false);
            setPendingAddProductId(null);
          }
        }}
      />
    </div>
  );
}
