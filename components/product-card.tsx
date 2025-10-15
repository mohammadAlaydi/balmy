"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";
import DrawerComponent from "./layout/drawer/drawer-component";
import QuickProductDetails from "./quick-product-details";
import { useAppDispatch } from "@/store/hooks";
import { addToCart, updateCartQuantity } from "@/store/slices/cart-slice";
import { getProductDetails } from "@/store/slices/product-details-slice";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import ReactStars from "./react-stars";
import { ProductCardProps } from "@/types/types";
import { getCurrentMainImage, getHoverImage } from "@/static-data/static-data";
import { PuffLoader } from "react-spinners";
import ZeroQuantity from "./zero-quantity";
import { FaCartArrowDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FavouriteButton } from "./favourite-button";
import { FaRegEye } from "react-icons/fa";
import AuthModal from "./auth/auth-modal";
import toast from "react-hot-toast";

export default function ProductCard({
  product,
  cardColSpan,
}: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // <- local spinner state
  const [chosenVariantId, setChosenVariantId] = useState<
    number | string | null
  >(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAddProductId, setPendingAddProductId] = useState<number | null>(
    null
  );
  const [chosenVariantSku, setChosenVariantSku] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const t = useTranslations("products");
  const td = useTranslations("product-details");
  const router = useRouter();

  const { productDetails } = useSelector((state: any) => state.productDetails);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { data: cartData } = useSelector((state: any) => state.cart);

  const baseImageUrl = getCurrentMainImage(product, selectedVariantIndex ?? 0);
  const hoverImageUrl = getHoverImage(product, selectedVariantIndex ?? 0);
  const isInStock = product?.in_stock ?? product?.inStock ?? false;

  const handleViewProduct = () => {
    dispatch(getProductDetails({ id: (product as any).product_id }));
  };

  const handleVariantSelect = (
    index: number,
    variantId?: number | string,
    sku?: string
  ) => {
    setSelectedVariantIndex(index);
    if (variantId != null) setChosenVariantId(variantId);
    if (sku != null) setChosenVariantSku(sku);
    console.log(chosenVariantSku);
  };

  const resolveTargetId = () => {
    if (product?.variants && product?.variants?.length > 0) {
      return chosenVariantId ?? (product.variants[0] as any)?.product_id;
    } else if ((product as any).product_id && !product.variants) {
      return (product as any).product_id;
    }
  };

  // Check if product is already in cart
  const isProductInCart = (productId: number) => {
    if (!cartData?.data?.items) return false;
    return cartData.data.items.some(
      (item: any) =>
        item?.additional?.product_id === productId ||
        item?.product?.id === productId
    );
  };

  // Get current quantity of product in cart
  const getProductCartQuantity = (productId: number) => {
    if (!cartData?.data?.items) return 0;
    const cartItem = cartData.data.items.find(
      (item: any) =>
        item?.additional?.product_id === productId ||
        item?.product?.id === productId
    );
    return cartItem ? Number(cartItem.quantity) : 0;
  };

  const handleAddToCart = async () => {
    if (!isInStock || isAdding) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      const target = resolveTargetId();
      if (target != null) setPendingAddProductId(Number(target));
      setShowAuthModal(true);
      return;
    }

    const productId = resolveTargetId();
    if (!productId) return;

    try {
      setIsAdding(true);

      // Check if product is already in cart
      if (isProductInCart(Number(productId))) {
        // Update existing cart item quantity
        const currentQuantity = getProductCartQuantity(Number(productId));
        const maybePromise: any = dispatch(
          updateCartQuantity({
            productId: Number(productId),
            quantity: currentQuantity + 1,
          })
        );
        if (typeof maybePromise?.unwrap === "function") {
          await maybePromise.unwrap();
        } else {
          await maybePromise;
        }
        toast.success(t("quantity-updated"));
      } else {
        // Add new item to cart
        const maybePromise: any = dispatch(
          addToCart({ productId: Number(productId), productQTY: 1 })
        );
        if (typeof maybePromise?.unwrap === "function") {
          await maybePromise.unwrap();
        } else {
          await maybePromise;
        }
        toast.success(t("added-to-cart"));
      }
    } catch (err) {
      const error = err as string;
      toast.error(error);
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <Card
      onMouseEnter={() => (isInStock ? setIsHovered(true) : undefined)}
      onMouseLeave={() => (isInStock ? setIsHovered(false) : undefined)}
      className={`product-card shadow-none hover:shadow-[0px_6px_20px_rgba(149,157,165,0.1)] py-0 h-fit gap-0 ${
        isInStock ? "group" : ""
      } relative rounded-t-lg ${
        cardColSpan || "col-span-6 xl:col-span-2"
      } border border-gray-200 hover:border-red-color rounded-lg`}
    >
      {!isInStock && <ZeroQuantity />}

      <CardHeader className="p-0 relative group overflow-hidden rounded-t-lg gap-0">
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={isHovered ? { x: 0, opacity: 1 } : { x: 10, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          <div className="absolute top-2 ltr:left-2 rtl:right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FavouriteButton product={product} />
            <DrawerComponent
              trigger={
                <Button
                  variant="ghost"
                  onClick={handleViewProduct}
                  className="text-3xl cursor-pointer text-black hidden md:flex opacity-80 hover:opacity-100"
                >
                  <FaRegEye className="text-xl " />
                </Button>
              }
            >
              <QuickProductDetails product={productDetails?.data} />
            </DrawerComponent>
          </div>
        </motion.div>

        {product?.new && (
          <Badge className="bg-red-600 text-white font-semibold px-2 py-1 text-xs absolute top-2 ltr:right-2 rtl:left-2 z-10 shadow-md">
            {td("new")}
          </Badge>
        )}

        <Image
          width={224}
          height={224}
          src={baseImageUrl}
          alt={`${product?.name || t("product")} - ${chosenVariantSku || ""}`}
          className="rounded-t-lg w-full h-full aspect-square transition-all duration-300"
          onClick={() => router.push(`/product/${(product as any).product_id}`)}
        />

        {hoverImageUrl !== baseImageUrl && (
          <Image
            width={224}
            height={224}
            src={hoverImageUrl}
            alt={`${product?.name || t("product")} ${t("variant-image")} - ${
              product?.sku || ""
            }`}
            className="absolute inset-0 rounded-t-lg w-full h-full aspect-square object-cover transition-all duration-300 opacity-0 group-hover:opacity-100"
            onClick={() =>
              router.push(`/product/${(product as any).product_id}`)
            }
          />
        )}

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
          className="absolute bottom-1 md:bottom-3 left-[5%] w-[90%] mx-auto"
        >
          <Button
            onClick={handleAddToCart}
            disabled={isAdding || !isInStock}
            className="bg-transparent hover:bg-transparent md:hover:bg-black/85 md:bg-black/85 text-white w-full rounded-sm"
          >
            {isAdding ? (
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
        {/* Name and SKU */}
        <div className="flex justify-between gap-1">
          <p className="font-[600] md:font-[650] md:text-sm text-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {product?.name || t("product-name")}
          </p>
          <p className="font-[600] md:font-[650] md:text-sm text-xs overflow-hidden text-ellipsis whitespace-nowrap">
            {chosenVariantSku != null
              ? chosenVariantSku
              : product?.variants?.length > 0
              ? product?.variants?.[0]?.sku
              : product?.sku}
          </p>
        </div>

        <ReactStars edit={false} rating={product?.reviews?.total || 0} />

        {/* Variants + desktop price */}
        <div className="flex justify-between gap-1 items-center">
          {product?.variants?.length ? (
            <div className="items-center gap-2 hidden md:flex transition-all duration-300">
              {product.variants
                .slice(0, 3)
                .map((variant: any, index: number) => (
                  <div
                    key={(variant as any).product_id}
                    className="relative mb-3"
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
                        (selectedVariantIndex === null && index === 0)
                          ? "ring-2 ring-gray-300 scale-110"
                          : "hover:scale-105"
                      }`}
                      onClick={() =>
                        handleVariantSelect(
                          index,
                          (variant as any).product_id,
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
                  alt={`${product?.name || t("product")}  `}
                  className="cursor-pointer transition-all duration-200 rounded-full ring-2 ring-gray-300 scale-110 h-[32px] w-[32px]"
                  onClick={() =>
                    handleVariantSelect(
                      0,
                      (product as any).product_id,
                      product?.sku
                    )
                  }
                />
              </div>
            </div>
          )}

          <p className="text-xs md:text-sm mb-3 text-nowrap hidden md:flex items-center gap-2">
            {(() => {
              const pv = Array.isArray(product?.variants)
                ? product.variants
                : [];
              const base = Number.isFinite(Number(product?.price))
                ? Number(product?.price)
                : undefined;
              const minVar = pv
                .map((v: any) => v?.special_price ?? v?.price)
                .map((x: any) =>
                  Number.isFinite(Number(x)) ? Number(x) : undefined
                )
                .filter((n: any) => typeof n === "number");
              const price =
                base ?? (minVar.length ? Math.min(...(minVar as number[])) : 0);
              return price.toFixed(2);
            })()}{" "}
            <i className="icon-rial"></i>
          </p>
        </div>
      </CardContent>

      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={(open) => {
          setShowAuthModal(open);
          if (!open) setPendingAddProductId(null);
        }}
        onAuthenticated={async () => {
          // Auto add after successful login
          const targetId = pendingAddProductId ?? Number(resolveTargetId());
          if (!targetId) return;
          try {
            setIsAdding(true);

            // Check if product is already in cart
            if (isProductInCart(targetId)) {
              // Update existing cart item quantity
              const currentQuantity = getProductCartQuantity(targetId);
              const maybePromise: any = dispatch(
                updateCartQuantity({
                  productId: targetId,
                  quantity: currentQuantity + 1,
                })
              );
              if (typeof maybePromise?.unwrap === "function") {
                await maybePromise.unwrap();
              } else {
                await maybePromise;
              }
              toast.success(t("quantity-updated"));
            } else {
              // Add new item to cart
              const maybePromise: any = dispatch(
                addToCart({ productId: targetId, productQTY: 1 })
              );
              if (typeof maybePromise?.unwrap === "function") {
                await maybePromise.unwrap();
              } else {
                await maybePromise;
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
