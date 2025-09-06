"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoHeartCircle } from "react-icons/io5";
import { toast } from "sonner";
import { motion } from "framer-motion";
import DrawerComponent from "./layout/drawer/drawer-component";
import QuickProductDetails from "./quick-product-details";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cart-slice";
import { getProductDetails } from "@/store/slices/product-details-slice";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import ReactStars from "./react-stars";
import { FaRegEye } from "react-icons/fa";
import { ProductCardProps } from "@/types/types";
import { getCurrentMainImage, getHoverImage } from "@/static-data/static-data";
import { PuffLoader } from "react-spinners";
import ZeroQuantity from "./zero-quantity";

export default function ProductCard({
  product,
  cardColSpan,
}: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<
    number | null
  >(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [choosenVarianrID, setChoosenVarianrID] = useState(null)
  const dispatch = useAppDispatch();
  const t = useTranslations("products");

  const { productDetails } = useSelector((state: any) => state.productDetails);
  const { isLoading: isAddCartLoading } = useSelector(
    (state: any) => state.cart
  );

  const baseImageUrl = getCurrentMainImage(product, selectedVariantIndex ?? 0);
  const hoverImageUrl = getHoverImage(product, selectedVariantIndex ?? 0);
  const isInStock = product?.in_stock ?? product?.inStock ?? false;

  const handleAddToFavorites = () => {
    toast.success(
      `${t("added-to-favorites")} ${product?.name || t("product")} - ${product?.sku || ""
      }`,
      {
        duration: 3000,
        position: "top-right",
      }
    );
  };

  const handleAddToCart = (id: string | number) => {
    dispatch(addToCart({ productId: id }));

  };
  const handleViewProduct = () => {
    dispatch(getProductDetails({ id: product.id }));
  };

  const handleVariantSelect = (index: number) => {
    setSelectedVariantIndex(index);
  };

  // Reset loading state when cart operation completes
  useEffect(() => {
    if (!isAddCartLoading && isAddingToCart) {
      setIsAddingToCart(false);
    }
  }, [isAddCartLoading, isAddingToCart]);

  return (
    <Card
      onMouseEnter={() => product?.in_stock ? setIsHovered(true) : undefined}
      onMouseLeave={() => product?.in_stock ? setIsHovered(false) : undefined}
      className={`product-card shadow-none hover:shadow-[0px_6px_20px_rgba(149,157,165,0.1)] py-0 h-fit gap-0 ${product?.in_stock ? "group" : ""} relative rounded-t-lg ${cardColSpan || "col-span-6  xl:col-span-2"
        } border border-gray-200 hover:border-red-color rounded-lg`}
    >
      {!product?.in_stock && <ZeroQuantity />}
      <CardHeader className="p-0 relative group overflow-hidden rounded-t-lg gap-0">
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={
            isHovered
              ? {
                x: 0,
                opacity: 1,
              }
              : {
                x: 10,
                opacity: 0,
              }
          }
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: 0.1,
          }}
        >
          <div className="absolute top-2 ltr:left-2 rtl:right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <IoHeartCircle
              className={`text-3xl cursor-pointer ${product?.featured ? "text-black" : "text-white"
                } drop-shadow-lg hidden md:flex`}
              onClick={handleAddToFavorites}
            />
            <DrawerComponent
              hoverDelay={800}
              autoCloseDelay={1000}
              trigger={
                <FaRegEye
                  onClick={handleViewProduct}
                  className="text-3xl cursor-pointer text-black drop-shadow-lg hidden md:flex"
                />
              }
            >
              <QuickProductDetails product={productDetails?.data} />
            </DrawerComponent>
          </div>
        </motion.div>

        {product?.new && (
          <Badge className="bg-red-color absolute top-2 ltr:right-2 rtl:left-2 z-10">
            New
          </Badge>
        )}
        <Image
          width={224}
          height={224}
          src={baseImageUrl}
          alt={`${product?.name || t("product")} - ${product?.sku || ""}`}
          className="rounded-t-lg w-full h-full aspect-square transition-all duration-300"
        />
        {hoverImageUrl !== baseImageUrl && (
          <Image
            width={224}
            height={224}
            src={hoverImageUrl}
            alt={`${product?.name || t("product")} hover - ${product?.sku || ""
              }`}
            className="absolute inset-0 rounded-t-lg w-full h-full aspect-square object-cover transition-all duration-300 opacity-0 group-hover:opacity-100"
          />
        )}

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={
            isHovered
              ? {
                y: 0,
                opacity: 1,
              }
              : {
                y: 10,
                opacity: 0,
              }
          }
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: 0.1,
          }}
          className="absolute bottom-3 left-[5%] w-[90%] mx-auto hidden md:flex"
        >
          <Button
            onClick={() => {
              setIsAddingToCart(true);
              handleAddToCart(product?.variants ? choosenVarianrID || product?.variants[0].id : product.id);
            }}
            disabled={isAddingToCart}
            className="bg-black/85 text-white w-full rounded-full"
          >
            {isAddingToCart ? (
              <PuffLoader color="#ffffff" size={30} />
            ) : (
              <div className="flex items-center gap-2">
                {t("add-to-cart")}{" "}
                <MdOutlineShoppingCart className="text-xl " />
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
          <p className="font-[600] md:font-[650] md:text-sm text-xs">
            {product?.sku}
          </p>
        </div>
        {/* Stars */}

        <ReactStars edit={false} rating={product?.reviews?.total || 0} />

        {/* Stock status */}
        <div className="flex justify-between gap-1 items-center">
          <p
            className={`text-xs md:text-sm mb-2 ${isInStock ? "text-green-600" : "text-red-color"
              }`}
          >
            {isInStock ? "متوفر" : "غير متوفر"}
          </p>

          <p className="text-xs md:text-sm  text-nowrap flex md:hidden">
            {Number(product?.price).toFixed(2) || "0"} {t("currency")}
          </p>
        </div>
        {/* Variant images and price */}
        <div className="flex justify-between gap-1 items-center">
          {product?.variants && product.variants.length > 3 ? (
            <div className="items-center gap-3 hidden md:flex transition-all duration-300">
              {/* Variant images */}
              {product.variants.slice(0, 3).map((variant, index) => (
                <div key={variant.id} className="relative mb-3" onClick={() => { setChoosenVarianrID(variant?.id) }}>
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
                    className={`cursor-pointer transition-all duration-200 rounded-full h-[32px] w-[32px] ${selectedVariantIndex === index ||
                      selectedVariantIndex === null && index == 0
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
            product?.variants?.map((variant, index) =>
              <div key={index} className="justify-between items-center gap-3 w-full hidden md:flex">
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
            )
          )}
          {/* Price */}
          <p className="text-xs md:text-sm mb-3 text-nowrap hidden md:flex">
            {product?.price || "0"} {t("currency")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
