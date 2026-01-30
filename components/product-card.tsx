"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import DrawerComponent from "./layout/drawer/drawer-component";
import QuickProductDetails from "./quick-product-details";
import ZeroQuantity from "./zero-quantity";
import { FavouriteButton } from "./favourite-button";
import AuthModal from "./auth/auth-modal";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cart-slice";
import { getProductDetails } from "@/store/slices/product-details-slice";
import { ProductCardProps } from "@/types/types";
import { getCurrentMainImage, getHoverImage } from "@/static-data/static-data";
import { useFavourites } from "@/hooks/use-favourites";
import { FaPlus } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import ProductIncementOrDecrement from "./product-increment-or-decrement";
import { MdOutlineShoppingCart } from "react-icons/md";
import StarRating from "./react-stars";
import { Rating, RatingButton } from "./ui/rating";

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
export default function ProductCard({
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
  const locale = useLocale();
  const { moveToCart } = useFavourites();
  const t = useTranslations("products");
  const td = useTranslations("product-details");

  const { productDetails } = useSelector((state: any) => state.productDetails);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { data: cartData } = useSelector((state: any) => state.cart);

  const baseImageUrl = getCurrentMainImage(product, selectedVariantIndex ?? 0);
  const hoverImageUrl = getHoverImage(product, selectedVariantIndex ?? 0);
  const isInStock = product?.in_stock ?? product?.inStock ?? false;
  const productPrice = calculateProductPrice(product);

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

  /* ---------------- Cart Button Variants ---------------- */
  const motionVariants = {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    exit: { scaleX: 0 },
  };
  return (
    <Card
      onMouseEnter={() => isInStock && setIsHovered(true)}
      onMouseLeave={() => isInStock && setIsHovered(false)}
      className={`relative product-card shadow-none hover:shadow-[0px_10px_30px_rgba(149,157,165,0.1)] py-0 h-fit rounded-lg gap-3 ${cardColSpan || "col-span-6 xl:col-span-2"
        } border border-gray-200 hover:border-red-color`}
    >
      {!isInStock && <ZeroQuantity product={product} wishlistProductId={wishlistProductId} />}

      <CardHeader className="p-0 relative overflow-hidden rounded-t-lg group">
        {/* Hover Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-2 rtl:left-2 ltr:right-2 z-10 flex flex-col gap-3"
        >
          <FavouriteButton product={product} className="cursor-pointer" />
          <DrawerComponent
            trigger={
              <GrView
                size={20}
                onClick={handleViewProduct}
                className="cursor-pointer text-black hover:text-red-500 transition"
              />
            }
          >
            <QuickProductDetails product={productDetails?.data} />
          </DrawerComponent>
        </motion.div>

        {/* New Badge */}
        {product?.new && (
          <Badge className="bg-red-600 text-white font-semibold px-2 py-1 text-xs absolute top-2 ltr:left-2 rtl:right-2 z-10 shadow-md">
            {td("new")}
          </Badge>
        )}

        <div className="relative group w-full aspect-square overflow-hidden rounded-t-lg">
          {/* Main Image */}
          <Image
            src={baseImageUrl}
            alt={product?.name || ""}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={95}
            className="object-cover transition-transform duration-500 transform group-hover:scale-105 cursor-pointer"
            onClick={() =>
              router.push(
                `/${locale}/product/${wishlistProductId || product?.product_id}`
              )
            }
            priority
          />

          {/* Hover Image */}
          {hoverImageUrl !== baseImageUrl && (
            <Image
              src={hoverImageUrl}
              alt={`${product?.name} hover`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={95}
              className="object-cover transition-transform duration-500 transform group-hover:scale-105 opacity-0 group-hover:opacity-100 cursor-pointer"
              onClick={() =>
                router.push(
                  `/${locale}/product/${wishlistProductId || product?.product_id}`
                )
              }
            />
          )}
        </div>

        {/* Cart Buttons */}
        <div className="absolute right-2 bottom-2">
          <AnimatePresence mode="wait">
            {isInCart && !showIncDec ? (
              <motion.div
                key="cart-btn"
                variants={motionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={() => setShowIncDec(true)}
                  className="bg-[#3866df] hover:bg-[#3866df]/85 text-white flex items-center gap-1 p-0 mb-2 rounded-md"
                >
                  <MdOutlineShoppingCart /> {cartQuantity}
                </Button>
              </motion.div>
            ) : showIncDec && isInCart ? (
              <motion.div
                key="inc-dec-btn"
                variants={motionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <div className="mb-2 bg-[#3866df] text-white py-1 px-2 rounded-md">
                  <ProductIncementOrDecrement
                    product={product}
                    quantity={cartQuantity}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="add-btn"
                variants={motionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={wishlistId ? handleMoveToCart : handleAddToCart}
                  disabled={isAdding || isMovingToCart || !isInStock}
                  className="bg-black hover:bg-black/85 text-white w-[35px] h-[35px] flex items-center justify-center shadow-md mb-2 rounded-full"
                >
                  {isAdding || isMovingToCart ? (
                    <BeatLoader color="#fff" size={3} />
                  ) : (
                    <FaPlus size={10} />
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-3 pb-3 flex flex-col gap-2 sm:gap-3">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500 truncate max-w-[100px]">
            {chosenVariantSku ?? product?.sku}
          </p>
          <p className="font-semibold text-sm truncate w-[100] sm:w-auto">{product?.name}</p>
        </div>

        {/* Variant Selector */}
        <div className="scale-[0.85] sm:scale-100 flex items-center justify-between">
          <div className="flex justify-between gap-1 items-center">
            {product?.variants?.length ? (
              <div className="items-center gap-2 hidden sm:flex transition-all duration-300">
                {product.variants
                  .slice(0, 2)
                  .map((variant: any, index: number) => (
                    <div key={variant?.product_id} className="relative">
                      <Image
                        width={28}
                        height={28}
                        src={
                          variant.base_image?.original_image_url ||
                          "/assets/images/no-image.webp"
                        }
                        alt={`${product?.name || t("product")} ${t(
                          "variant-image"
                        )} ${index + 1}`}
                        className={`cursor-pointer transition-all duration-200 rounded-full h-[28px] w-[28px] ${selectedVariantIndex === index ||
                          (selectedVariantIndex === null && index === 0)
                          ? "ring-2 ring-gray-300"
                          : "border-2 border-dotted border-gray-300"
                          }`}
                        onClick={() =>
                          handleVariantSelect(
                            index,
                            variant?.product_id,
                            variant?.sku
                          )
                        }
                      />
                    </div>
                  ))}
                {product.variants.length > 2 && (
                  <Badge className="mx-1 bg-transparent text-primary ring-2 ring-gray-300 w-[28px] h-[28px] p-0 flex items-center rounded-full justify-center shadow-[inset_0_2px_4_rgba(0,0,0,0.1)] text-xs">
                    +{product.variants.length - 2}
                  </Badge>
                )}
              </div>
            ) : (
              <div className="justify-between items-center gap-3 w-full hidden sm:flex">
                <div className="relative">
                  <Image
                    width={28}
                    height={28}
                    src={
                      product?.base_image?.original_image_url ||
                      "/assets/images/no-image.webp"
                    }
                    alt={`${product?.name || t("product")}`}
                    className={`${selectedVariantIndex === 0 || selectedVariantIndex == null
                      ? "ring-2 ring-gray-300"
                      : "border-2 border-dotted border-gray-300"
                      } cursor-pointer transition-all duration-200 rounded-full ring-2 ring-gray-300 h-[28px] w-[28px]`}
                    onClick={() =>
                      handleVariantSelect(0, product?.product_id, product?.sku)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price + Rating */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm sm:text-base">
            {productPrice.toFixed(2)} <i className="icon-rial"></i>
          </p>
          <div className="hidden sm:flex items-center gap-1 bg-gray-100 px-2 rounded-full w-fit shadow-sm">
            <Rating readOnly value={Math.floor(Number((product?.reviews as any)?.average_rating || 4.5))} max={5}>
              {Array.from({ length: 5 }).map((_, i) => (
                <RatingButton key={i} size={14} />
              ))}
            </Rating>
            <Badge className="bg-transparent text-gray-500 p-0 text-sm font-[550]">
              {(product?.reviews as any)?.average_rating || 4.5}
            </Badge>{" "}
          </div>
        </div>
      </CardContent>

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
    </Card>
  );
}
