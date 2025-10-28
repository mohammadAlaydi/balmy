"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaCartArrowDown, FaRegEye } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import DrawerComponent from "./layout/drawer/drawer-component";
import QuickProductDetails from "./quick-product-details";
import ReactStars from "./react-stars";
import ZeroQuantity from "./zero-quantity";
import { FavouriteButton } from "./favourite-button";
import AuthModal from "./auth/auth-modal";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cart-slice";
import { getProductDetails } from "@/store/slices/product-details-slice";
import { ProductCardProps } from "@/types/types";
import { getCurrentMainImage, getHoverImage } from "@/static-data/static-data";
import { useFavourites } from "@/hooks/use-favourites";

// Helper functions
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

const isProductInCart = (cartData: any, productId: number): boolean => {
  return findCartItem(cartData, productId) !== undefined;
};

const getProductCartQuantity = (cartData: any, productId: number): number => {
  const cartItem = findCartItem(cartData, productId);
  return cartItem ? Number(cartItem.quantity) : 0;
};

const resolveProductId = (
  product: any,
  chosenVariantId: number | string | null
): number | undefined => {
  if (product?.variants && product?.variants?.length > 0) {
    return chosenVariantId
      ? Number(chosenVariantId)
      : product.variants[0]?.product_id;
  }
  return product?.product_id;
};

export default function ProductCard({
  product,
  wishlistProductId,
  cardColSpan,
  wishlistId,
}: ProductCardProps) {
  // State
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isMovingToCart, setIsMovingToCart] = useState(false);
  const [chosenVariantId, setChosenVariantId] = useState<
    number | string | null
  >(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAddProductId, setPendingAddProductId] = useState<number | null>(
    null
  );
  const [chosenVariantSku, setChosenVariantSku] = useState<string | null>(null);

  // Hooks
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { moveToCart } = useFavourites();
  const t = useTranslations("products");
  const td = useTranslations("product-details");

  // Selectors
  const { productDetails } = useSelector((state: any) => state.productDetails);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { data: cartData } = useSelector((state: any) => state.cart);

  // Computed values
  const baseImageUrl = getCurrentMainImage(product, selectedVariantIndex ?? 0);
  const hoverImageUrl = getHoverImage(product, selectedVariantIndex ?? 0);
  const isInStock = product?.in_stock ?? product?.inStock ?? false;
  const productPrice = calculateProductPrice(product);

  // Event handlers
  const handleViewProduct = () => {
    dispatch(getProductDetails({ id: product?.product_id }));
  };

  const handleVariantSelect = (
    index: number,
    variantId?: number | string,
    sku?: string
  ) => {
    setSelectedVariantIndex(index);
    if (variantId != null) setChosenVariantId(variantId);
    if (sku != null) setChosenVariantSku(sku);
  };

  const handleAddToCart = async () => {
    if (!isInStock || isAdding) return;

    const productId = resolveProductId(product, chosenVariantId);
    if (!productId) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      setPendingAddProductId(productId);
      setShowAuthModal(true);
      return;
    }

    try {
      setIsAdding(true);

      if (isProductInCart(cartData, productId)) {
        // Update existing cart item quantity
        const promise = dispatch(
          addToCart({
            productId,
            productQTY: 1,
          })
        );

        if (typeof promise?.unwrap === "function") {
          await promise.unwrap();
        } else {
          await promise;
        }
        toast.success(t("quantity-updated"));
      } else {
        // Add new item to cart
        const promise = dispatch(addToCart({ productId, productQTY: 1 }));

        if (typeof promise?.unwrap === "function") {
          await promise.unwrap();
        } else {
          await promise;
        }
        toast.success(t("added-to-cart"));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(errorMessage);
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
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to move to cart";
      toast.error(errorMessage);
    } finally {
      setIsMovingToCart(false);
    }
  };
  return (
    <Card
      onMouseEnter={() => isInStock && setIsHovered(true)}
      onMouseLeave={() => isInStock && setIsHovered(false)}
      className={`product-card shadow-none hover:shadow-[0px_6px_20px_rgba(149,157,165,0.1)] py-0 h-fit gap-0 ${
        isInStock ? "group" : ""
      } relative rounded-t-lg ${
        cardColSpan || "col-span-6 xl:col-span-2"
      } border border-gray-200 hover:border-red-color rounded-lg`}
    >
      {!isInStock && <ZeroQuantity />}

      <CardHeader className="p-0 relative group overflow-hidden rounded-t-lg gap-0">
        {/* Hover Actions */}
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={isHovered ? { x: 0, opacity: 1 } : { x: 10, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          <div className="absolute top-2 rtl:left-2 ltr:right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FavouriteButton product={product} />
            <DrawerComponent
              trigger={
                <Button
                  variant="ghost"
                  onClick={handleViewProduct}
                  className="text-3xl cursor-pointer text-black hidden md:flex opacity-80 hover:opacity-100"
                >
                  <FaRegEye className="text-xl" />
                </Button>
              }
            >
              <QuickProductDetails product={productDetails?.data} />
            </DrawerComponent>
          </div>
        </motion.div>

        {/* New Badge */}
        {product?.new && (
          <Badge className="bg-red-600 text-white font-semibold px-2 py-1 text-xs absolute top-2 ltr:left-2 rtl:right-2 z-10 shadow-md">
            {td("new")}
          </Badge>
        )}

        {/* Main Product Image */}
        <Image
          width={224}
          height={224}
          src={baseImageUrl}
          alt={`${product?.name || t("product")} - ${chosenVariantSku || ""}`}
          className="rounded-t-lg w-full h-full aspect-square transition-all duration-300"
          onClick={() =>
            router.push(
              `/product/${
                wishlistProductId ? wishlistProductId : product?.product_id
              }`
            )
          }
        />

        {/* Hover Image */}
        {hoverImageUrl !== baseImageUrl && (
          <Image
            width={224}
            height={224}
            src={hoverImageUrl}
            alt={`${product?.name || t("product")} ${t("variant-image")} - ${
              product?.sku || ""
            }`}
            className="absolute inset-0 rounded-t-lg w-full h-full aspect-square object-cover transition-all duration-300 opacity-0 group-hover:opacity-100"
            onClick={() => router.push(
              `/product/${
                wishlistProductId ? wishlistProductId : product?.product_id
              }`)}
          />
        )}

        {/* Add to Cart Button */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
          className="absolute bottom-1 md:bottom-3 left-[5%] w-[90%] mx-auto"
        >
          <Button
            onClick={wishlistId ? handleMoveToCart : handleAddToCart}
            disabled={isAdding || isMovingToCart || !isInStock}
            className="bg-transparent hover:bg-transparent md:hover:bg-black/85 md:bg-black/85 text-white w-full rounded-sm"
          >
            {isAdding || isMovingToCart ? (
              <PuffLoader size={30} />
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden md:flex">{t("add-to-cart")}</span>
                <FaCartArrowDown className="text-3xl text-black md:text-white flex md:hidden" />
                <MdOutlineShoppingCart className="text-xl text-white hidden md:flex" />
              </div>
            )}
          </Button>
        </motion.div>
      </CardHeader>

      <CardContent className="px-2 pt-4 flex flex-col gap-2 justify-start">
        {/* Product Name and SKU */}
        <div className="flex justify-between gap-1">
          <p className="font-[600] md:font-[650] md:text-sm text-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {product?.name || t("product-name")}
          </p>
          <p className="font-[600] md:font-[650] md:text-sm text-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {chosenVariantSku ??
              (product?.variants?.length
                ? product.variants[0]?.sku
                : product?.sku)}
          </p>
        </div>

        {/* Rating */}
        <ReactStars edit={false} rating={product?.reviews?.total || 0} />

        {/* Variants and Price */}
        <div className="flex justify-between gap-1 items-center">
          {/* Variant Images */}
          {product?.variants?.length ? (
            <div className="items-center gap-2 hidden md:flex transition-all duration-300">
              {product.variants
                .slice(0, 3)
                .map((variant: any, index: number) => (
                  <div key={variant?.product_id} className="relative mb-3">
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
                        (selectedVariantIndex === null && index === 0)
                          ? "ring-2 ring-gray-300 scale-110"
                          : "hover:scale-105"
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
              {product.variants.length > 3 && (
                <Badge className="mx-1 bg-transparent text-primary mb-3 ring-2 ring-gray-300 scale-110 w-[32px] h-[32px] p-0 flex items-center rounded-full justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-xs">
                  +{product.variants.length - 3}
                </Badge>
              )}
            </div>
          ) : (
            <div className="justify-between items-center gap-3 w-full hidden md:flex">
              <div className="relative mb-3">
                <Image
                  width={32}
                  height={32}
                  src={
                    product?.base_image?.original_image_url ||
                    "/assets/images/no-image.webp"
                  }
                  alt={`${product?.name || t("product")}`}
                  className="cursor-pointer transition-all duration-200 rounded-full ring-2 ring-gray-300 scale-110 h-[32px] w-[32px]"
                  onClick={() =>
                    handleVariantSelect(0, product?.product_id, product?.sku)
                  }
                />
              </div>
            </div>
          )}

          {/* Price */}
          <p className="text-xs md:text-sm mb-3 text-nowrap hidden md:flex items-center gap-2">
            {productPrice.toFixed(2)} <i className="icon-rial"></i>
          </p>
        </div>
      </CardContent>

      {/* Authentication Modal */}
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

            if (isProductInCart(cartData, targetId)) {
              const currentQuantity = getProductCartQuantity(
                cartData,
                targetId
              );
              const promise = dispatch(
                updateCartQuantity({
                  productId: targetId,
                  quantity: currentQuantity + 1,
                })
              );

              if (typeof promise?.unwrap === "function") {
                await promise.unwrap();
              } else {
                await promise;
              }
              toast.success(t("quantity-updated"));
            } else {
              const promise = dispatch(
                addToCart({ productId: targetId, productQTY: 1 })
              );

              if (typeof promise?.unwrap === "function") {
                await promise.unwrap();
              } else {
                await promise;
              }
              toast.success(t("added-to-cart"));
            }
          } finally {
            setIsAdding(false);
            setPendingAddProductId(null);
          }
        }}
      />
    </Card>
  );
}
