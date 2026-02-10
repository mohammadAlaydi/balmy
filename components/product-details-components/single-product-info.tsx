"use client";

import React from "react";
import { addToCart } from "@/store/slices/cart-slice";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MdOutlineShoppingCart, MdOutlineShare } from "react-icons/md";
import RatingBalmy from "../balmy/rating-balmy";
import VariantSelector from "../variant-selector";
import { useProductVariants } from "@/hooks/use-product-variants";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import AuthModal from "../auth/auth-modal";
import toast from "react-hot-toast";
import UseProductInfo from "@/hooks/use-product-info";
import { ProductDetailsApiResponse } from "@/types/types";
import RiyalSymbol from "@/components/RiyalSymbol";

interface SingleProductInfoProps {
  product: ProductDetailsApiResponse["data"];
  className?: string;
  variantProps?: ReturnType<typeof useProductVariants>;
}

export default function SingleProductInfo({
  product,
  className,
  variantProps,
}: SingleProductInfoProps) {
  const {
    hasVariants,
    colorVariants,
    availableSizesForSelectedColor,
    currentVariant,
    selectedVariants,
    handleColorChange,
    handleSizeChange,
  } = variantProps ?? useProductVariants({ product });

  const {
    hasDiscount,
    effectiveSpecial,
    effectivePrice,
    t,
    tProducts,
    loadingProductId,
    increaseOrDecreaseLoading,
    cartQuantityForProduct,
    setQuantity,
    handleUpdateQuantity,
    displayedQuantity,
    handleAddToCart,
    isAddingToCart,
    handleShare,
    showAuthModal,
    setShowAuthModal,
    setPendingAddProductId,
    pendingAddProductId,
    setIsAddingToCart,
    dispatch,
    quantity,
  } = UseProductInfo(
    currentVariant,
    product,
    hasVariants,
    colorVariants,
    availableSizesForSelectedColor,
    selectedVariants,
    handleColorChange,
    handleSizeChange
  );

  return (
    <Card className={`flex flex-col gap-6 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border-gray-200 ${className}`}>
      {/* Product Title */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2 font-cairo">
          {product.name}
        </h1>
        <p className="text-base text-gray-500 font-cairo">
          {product.sku}
        </p>
      </div>

      {/* Price Section */}
      <div className="border-y border-gray-200 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-2xl font-bold text-red-500 font-cairo flex items-center gap-1">
            {(hasDiscount ? effectiveSpecial! : effectivePrice).toFixed(2)}{" "}
            <RiyalSymbol className="w-4 h-4" />
          </div>
          {hasDiscount && (
            <>
              <div className="text-lg text-gray-500 line-through font-cairo flex items-center gap-1">
                {effectivePrice.toFixed(2)} <RiyalSymbol className="w-3 h-3" />
              </div>
              <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                {t("discount")}
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Stock Status */}
      <Badge
        className={`text-sm px-3 py-1 rounded ${currentVariant?.in_stock ?? product.in_stock
          ? "bg-green-100 text-green-800 border-green-200"
          : "bg-red-100 text-red-800 border-red-200"
          }`}
      >
        {currentVariant?.in_stock ?? product.in_stock
          ? t("in-stock")
          : t("out-of-stock")}
      </Badge>

      {/* Rating */}
      {product.reviews.average_rating && (
        <div className="flex items-center gap-2">
          <RatingBalmy value={product.reviews.average_rating} />
          <span className="text-sm text-gray-600">
            ({product.reviews.total} {t("reviews")})
          </span>
        </div>
      )}

      {/* Variant Selector */}
      {hasVariants && (
        <VariantSelector
          colorVariants={colorVariants}
          availableSizesForSelectedColor={availableSizesForSelectedColor}
          selectedColor={selectedVariants.color}
          selectedSize={selectedVariants.size}
          onColorChange={handleColorChange}
          onSizeChange={handleSizeChange}
        />
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-3 font-cairo">{t("quantity")}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const targetId = currentVariant?.product_id ?? product.product_id;
              if (!targetId) return;
              const isLoading = loadingProductId === targetId || increaseOrDecreaseLoading;


              if (cartQuantityForProduct && cartQuantityForProduct > 1) {
                handleUpdateQuantity(targetId, -1);
              } else {
                setQuantity((q) => Math.max(1, q - 1));
              }
            }}
            className={`w-10 h-10 flex justify-center items-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors ${loadingProductId === currentVariant?.product_id ||
              increaseOrDecreaseLoading ||
              displayedQuantity <= 1
              ? "text-gray-400"
              : ""
              }`}
            disabled={displayedQuantity <= 1}
          >
            <TiMinus className="text-sm" />
          </button>
          <span className="w-12 text-center text-lg font-medium">{displayedQuantity}</span>
          <button
            onClick={() => {
              const targetId = currentVariant?.product_id ?? product.product_id;
              if (!targetId) return;
              const isLoading = loadingProductId === targetId || increaseOrDecreaseLoading;


              if (cartQuantityForProduct) handleUpdateQuantity(targetId, 1);
              else setQuantity((q) => q + 1);
            }}
            className={`w-10 h-10 flex justify-center items-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors ${loadingProductId === currentVariant?.product_id || increaseOrDecreaseLoading
              ? "text-gray-400"
              : ""
              }`}
          >
            <FaPlus className="text-sm" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={!(currentVariant?.in_stock ?? product.in_stock) || isAddingToCart}
          className="bg-black text-white hover:bg-black/75 border border-black px-5 py-3 rounded transition-all duration-300 font-cairo text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdOutlineShoppingCart className="text-xl ml-2" />
          <Badge className="text-base bg-transparent">
            {isAddingToCart ? t("adding-to-cart") : t("add-to-cart")}
          </Badge>
        </Button>

        <div className="flex gap-3">

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

      {/* Product Type Badges */}
      <div className="flex gap-2">
        <Badge variant="outline" className="text-sm">
          {product.type === "simple" ? t("simple-product") : t("customizable-product")}
        </Badge>
        {product.new && <Badge className="bg-green-100 text-green-800 text-sm">{t("new")}</Badge>}
        {product.featured && <Badge className="bg-blue-100 text-blue-800 text-sm">{t("featured")}</Badge>}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={(open) => {
          setShowAuthModal(open);
          if (!open) setPendingAddProductId(null);
        }}
        onAuthenticated={async () => {
          const targetId = pendingAddProductId ?? currentVariant?.product_id ?? product.product_id;
          if (!targetId) return;

          try {
            setIsAddingToCart(true);
            const promise = dispatch(addToCart({ productId: targetId, productQTY: quantity }));
            if (promise?.unwrap) await promise.unwrap();
            else await promise;
            toast.success(tProducts("added-to-cart"));
          } catch (error: any) {
            toast.error(error?.message || tProducts("failed-to-add-to-cart"));
          } finally {
            setIsAddingToCart(false);
            setPendingAddProductId(null);
          }
        }}
      />
    </Card>
  );
}
