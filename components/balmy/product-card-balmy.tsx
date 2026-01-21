"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { Heart, ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import DrawerComponent from "../layout/drawer/drawer-component";
import QuickProductDetails from "../quick-product-details";
import ZeroQuantity from "../zero-quantity";
import { FavouriteButton } from "../favourite-button";
import AuthModal from "../auth/auth-modal";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cart-slice";
import { getProductDetails } from "@/store/slices/product-details-slice";
import { ProductCardProps } from "@/types/types";
import { getCurrentMainImage, getHoverImage } from "@/static-data/static-data";
import { useFavourites } from "@/hooks/use-favourites";
import { FaPlus } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import ProductIncementOrDecrement from "../product-increment-or-decrement";
import { MdOutlineShoppingCart } from "react-icons/md";
import RatingBalmy from "./rating-balmy";


/* ---------------- Helper Functions ---------------- */
const calculateProductPrice = (product: any): number => {
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const basePrice = Number.isFinite(Number(product?.price))
    ? Number(product?.price)
    : undefined;

  const variantPrices = variants
    .map((v: any) => v?.special_price ?? v?.price)
    .map((x: any) => (Number.isFinite(Number(x)) ? Number(x) : undefined))
    .filter((n: any) => typeof n === "number") as number[];

  return basePrice ?? (variantPrices.length ? Math.min(...variantPrices) : 0);
};

const findCartItem = (cartData: any, productId: number) => {
  if (!cartData?.data?.items) return null;
  return cartData.data.items.find(
    (item: any) =>
      item?.additional?.product_id === productId ||
      item?.product?.id === productId
  );
};

const isProductInCart = (cartData: any, productId: number): boolean =>
  !!findCartItem(cartData, productId);

const getProductCartQuantity = (cartData: any, productId: number): number => {
  const cartItem = findCartItem(cartData, productId);
  return cartItem ? Number(cartItem?.total_quantity || cartItem?.quantity) : 0;
};

const resolveProductId = (
  product: any,
  chosenVariantId: number | string | null
): number | undefined => {
  if (product?.variants?.length) {
    return chosenVariantId
      ? Number(chosenVariantId)
      : product.variants[0]?.product_id;
  }
  return product?.product_id;
};

/* ---------------- Component ---------------- */
export default function ProductCardBalmy({
  product,
  wishlistProductId,
  cardColSpan,
  wishlistId,
}: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isMovingToCart, setIsMovingToCart] = useState(false);
  const [chosenVariantId, setChosenVariantId] = useState<
    number | string | null
  >(null);
  const [chosenVariantSku, setChosenVariantSku] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAddProductId, setPendingAddProductId] = useState<number | null>(
    null
  );
  const [showIncDec, setShowIncDec] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { moveToCart } = useFavourites();
  const t = useTranslations("products");
  const td = useTranslations("product-details");

  const { productDetails } = useSelector((state: any) => state.productDetails);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { data: cartData } = useSelector((state: any) => state.cart);

  const baseImageUrl = getCurrentMainImage(product, selectedVariantIndex ?? 0);
  const isInStock = (product as any)?.in_stock ?? (product as any)?.inStock ?? false;
  const productPrice = calculateProductPrice(product);
  const originalPrice = (product as any)?.original_price || (product as any)?.price_regular?.value || productPrice * 1.3; // Mock discount
  const discountPercent = Math.round(((originalPrice - productPrice) / originalPrice) * 100);
  const category = typeof (product as any)?.category === "string" ? (product as any)?.category : (product as any)?.category?.name;

  const productId = resolveProductId(product, chosenVariantId);
  const isInCart = productId ? isProductInCart(cartData, productId) : false;
  const cartQuantity = productId
    ? getProductCartQuantity(cartData, productId)
    : 0;

  /* ---------------- Handlers ---------------- */
  const handleViewProduct = () => {
    dispatch(getProductDetails({ id: product?.product_id }));
  };

  const handleVariantSelect = (
    index: number,
    variantId?: number | string,
    sku?: string
  ) => {
    setSelectedVariantIndex(index);
    if (variantId) setChosenVariantId(variantId);
    if (sku) setChosenVariantSku(sku);
  };

  const handleAddToCart = async () => {
    if (!isInStock || isAdding) return;

    const targetId = resolveProductId(product, chosenVariantId);
    if (!targetId) return;

    if (!isAuthenticated) {
      setPendingAddProductId(targetId);
      setShowAuthModal(true);
      return;
    }

    try {
      setIsAdding(true);
      const promise = dispatch(
        addToCart({ productId: targetId, productQTY: 1 })
      );
      await (typeof promise.unwrap === "function" ? promise.unwrap() : promise);

      toast.success(
        isProductInCart(cartData, targetId)
          ? t("quantity-updated")
          : t("added-to-cart")
      );
      setShowIncDec(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setIsAdding(false);
    }
  };

  const handleMoveToCart = async () => {
    if (!wishlistId) return;
    try {
      setIsMovingToCart(true);
      await moveToCart(wishlistId);
      toast.success(t("moved-to-cart"));
    } catch {
      toast.error("Failed to move to cart");
    } finally {
      setIsMovingToCart(false);
    }
  };

  return (
    <div
      className={`relative flex flex-col ${cardColSpan || "col-span-6 xl:col-span-3"}`}
      onMouseEnter={() => isInStock && setIsHovered(true)}
      onMouseLeave={() => isInStock && setIsHovered(false)}
      dir="rtl"
    >
      {!isInStock && <ZeroQuantity product={product} wishlistProductId={wishlistProductId} />}

      {/* Product Image Container */}
      <div className="relative w-full aspect-[373/438] mb-4 overflow-hidden bg-[var(--color-light-gray)] group">
        <Image
          src={baseImageUrl}
          alt={product?.name || ""}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={95}
          className="object-cover object-center transition-transform duration-500 transform group-hover:scale-105 cursor-pointer"
          onClick={() => router.push(`/product/${wishlistProductId || product?.product_id}`)}
          priority
        />

        {/* Favorite Icon - Top Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-2 right-2 z-10"
        >
          <FavouriteButton
            product={product}
            className="w-[37px] h-[35px] border-2 border-[var(--color-medium-gray)] rounded flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          />
        </motion.div>

        {/* Quick View - Top Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="absolute top-14 right-2 z-10"
        >
          <DrawerComponent
            trigger={
              <button
                onClick={handleViewProduct}
                className="w-[37px] h-[35px] border-2 border-[var(--color-medium-gray)] rounded flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
              >
                <GrView className="w-5 h-5 text-[var(--color-medium-gray)]" />
              </button>
            }
          >
            <QuickProductDetails product={productDetails?.data} />
          </DrawerComponent>
        </motion.div>

        {/* New Badge */}
        {product?.new && (
          <Badge className="absolute top-2 left-2 z-10 bg-[var(--color-red-4)] text-white font-semibold px-2 py-1 text-xs shadow-md">
            {td("new")}
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-2">
        {/* Brand Name and Category Badge Row */}
        <div className="flex items-center justify-between">
          <h3 className="text-[var(--color-black-2)] text-lg sm:text-xl font-normal whitespace-nowrap truncate max-w-[180px]">
            {product?.name}
          </h3>
          {category && (
            <div className="w-auto px-2 h-[23px] bg-[var(--color-light-gray-4)] rounded-[7px] flex items-center justify-center flex-shrink-0">
              <span className="text-[var(--color-black)] text-xs font-medium whitespace-nowrap">
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Product SKU */}
        <p className="text-[var(--color-light-gray-5)] text-xs sm:text-sm font-normal line-clamp-2">
          {chosenVariantSku ?? product?.sku}
        </p>

        {/* Rating */}
        <div className="flex justify-start">
          <RatingBalmy value={Number(product?.rating || 4.5)} />
        </div>

        {/* Price and Discount Row */}
        <div className="flex items-center justify-between">
          {/* Prices - Right side */}
          <div className="flex items-center gap-2">
            {/* Current Price */}
            <span className="text-[var(--color-black)] text-lg sm:text-xl font-normal whitespace-nowrap">
              {productPrice.toFixed(0)}
            </span>

            {/* Old Price */}
            {originalPrice > productPrice && (
              <span className="text-[var(--color-light-gray-5)] text-xs sm:text-sm font-normal line-through whitespace-nowrap">
                {originalPrice.toFixed(0)}
              </span>
            )}
          </div>

          {/* Discount Badge - Left side */}
          {discountPercent > 0 && (
            <div className="w-[40px] h-[20px] bg-[var(--color-red-4)] rounded-[10px] flex items-center justify-center flex-shrink-0">
              <span className="text-[var(--color-white)] text-xs sm:text-sm font-bold whitespace-nowrap">
                {discountPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <AnimatePresence mode="wait">
          {isInCart && showIncDec ? (
            <motion.div
              key="inc-dec-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full h-[54px] border border-[var(--color-light-gray-3)] flex items-center justify-center gap-2 bg-[var(--color-black)] mt-2"
            >
              <div className="text-white">
                <ProductIncementOrDecrement
                  product={product}
                  quantity={cartQuantity}
                />
              </div>
            </motion.div>
          ) : isInCart ? (
            <motion.button
              key="cart-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => setShowIncDec(true)}
              className="w-full h-[54px] border border-[var(--color-light-gray-3)] flex items-center justify-center gap-2 bg-[var(--color-black)] hover:bg-[var(--color-dark-gray)] transition-colors mt-2"
            >
              <MdOutlineShoppingCart className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium whitespace-nowrap">
                {t("in-cart")} ({cartQuantity})
              </span>
            </motion.button>
          ) : (
            <motion.button
              key="add-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={wishlistId ? handleMoveToCart : handleAddToCart}
              disabled={isAdding || isMovingToCart || !isInStock}
              className="w-full h-[54px] border border-[var(--color-light-gray-3)] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding || isMovingToCart ? (
                <BeatLoader color="#000" size={5} />
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-[var(--color-black)]" />
                  <span className="text-[var(--color-black)] text-sm font-normal whitespace-nowrap">
                    أضــــــف للسلــــــــــــة
                  </span>
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>
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
            pendingAddProductId ?? resolveProductId(product, chosenVariantId);
          if (!targetId) return;
          try {
            setIsAdding(true);
            const promise = dispatch(
              addToCart({ productId: targetId, productQTY: 1 })
            );
            await (typeof promise.unwrap === "function"
              ? promise.unwrap()
              : promise);
            toast.success(t("added-to-cart"));
            setShowIncDec(true);
          } finally {
            setIsAdding(false);
            setPendingAddProductId(null);
          }
        }}
      />
    </div>
  );
}
