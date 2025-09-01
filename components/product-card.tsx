"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
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

// Define proper types for product variants and images
interface ProductImage {
  original_image_url: string;
}

interface ProductVariant {
  id: number;
  base_image?: ProductImage;
}

// Define proper types for the product
interface Product {
  id: number;
  name: string;
  nameEn?: string;
  price: number | string;
  priceEn?: string;
  sku: string;
  code?: string;
  base_image?: ProductImage;
  hovered_image?: ProductImage;
  variants?: ProductVariant[];
  category?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: Product;
  cardColSpan?: string;
}

export default function ProductCard({
  product,
  cardColSpan,
}: ProductCardProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null); // null = base image, 1+ = variant images
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  // Get the current main image based on selection
  const getCurrentMainImage = () => {
    if (selectedImage === null || selectedImage === 0) {
      return (
        product?.base_image?.original_image_url ||
        "/assets/images/product-card.jpg"
      );
    }
    return (
      product?.variants?.[selectedImage - 1]?.base_image?.original_image_url ||
      product?.base_image?.original_image_url ||
      "/assets/images/product-card.jpg"
    );
  };

  const baseImageUrl = getCurrentMainImage();
  const hoverImageUrl =
    product?.hovered_image?.original_image_url || baseImageUrl;

  const handleAddToFavorites = () => {
    toast.success(
      `تم إضافة ${product?.name || "المنتج"} - ${
        product?.sku || ""
      } للمفضلة بنجاح`,
      {
        duration: 3000,
        position: "top-right",
      }
    );
  };

  const handleAddToCart = ({ productId }: { productId: number }) => {
    dispatch(addToCart({ productId }));
  };

  return (
    <Card
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`shadow-[0px_6px_20px_rgba(149,157,165,0.1)] py-0 h-fit gap-0 group relative rounded-t-lg ${
        cardColSpan || "col-span-6  sm:col-span-4 md:col-span-3  xl:col-span-2"
      } border border-gray-200 rounded-lg`}
    >
      <CardHeader className="p-0 relative group overflow-hidden  rounded-t-lg gap-0 ">
        <div className="absolute top-2 ltr:left-2 rtl:right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <IoHeartCircle
            className="text-3xl cursor-pointer text-black drop-shadow-lg hidden md:flex"
            onClick={handleAddToFavorites}
          />
        </div>
        <Image
          width={224}
          height={224}
          src={baseImageUrl}
          alt={`${product?.name || "Product"} - ${product?.sku || ""}`}
          className="rounded-t-lg w-full h-full aspect-square  transition-all duration-300"
        />
        {hoverImageUrl !== baseImageUrl && (
          <Image
            width={224}
            height={224}
            src={hoverImageUrl}
            alt={`${product?.name || "Product"} hover - ${product?.sku || ""}`}
            className="absolute inset-0 rounded-t-lg w-full h-full aspect-square object-cover transition-all duration-300 opacity-0 group-hover:opacity-100"
          />
        )}
        {isHovered && (
          <DrawerComponent
            trigger={
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isHovered
                    ? {
                        y: 0,
                        opacity: 1,
                      }
                    : {
                        y: 20,
                        opacity: 0,
                      }
                }
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: 0.1,
                }}
                className="absolute bottom-5 left-[5%] w-[90%] mx-auto hidden md:flex"
              >
                <Button
                  onClick={() => handleAddToCart({ productId: product?.id })}
                  className="rounded-none bg-black/85 text-white w-full rounded-full"
                >
                  أضف للسلة <MdOutlineShoppingCart className="text-xl" />
                </Button>
              </motion.div>
            }
          >
            <QuickProductDetails product={product} />
          </DrawerComponent>
        )}
      </CardHeader>
      <CardContent className="px-2 pt-4 flex flex-col gap-3 justify-start ">
        <p className="font-[650] text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {product?.name || "Product Name"}
        </p>
        <p className="font-[650] text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {" "}
          {product?.sku || "N/A"}
        </p>
        <p className={`text-sm ${!product?.variants?.length ? "mb-3" : ""}`}>
          {product?.price || "0"} ج.م
        </p>
        <div ref={ref2}>
          {product?.variants && product?.variants?.length > 0 && (
            <div
              ref={ref2}
              className="flex items-center gap-2 my-1 hidden md:flex transition-all duration-300"
            >
              {/* Base image option */}
              <div className="relative mb-3">
                <Image
                  width={32}
                  height={32}
                  src={
                    product?.base_image?.original_image_url ||
                    "/assets/images/product-card.jpg"
                  }
                  alt={`${product?.name || "Product"} base`}
                  className={`cursor-pointer transition-all duration-200 rounded-sm ${
                    selectedImage === null
                      ? "ring-2 ring-gray-400 scale-110"
                      : "hover:scale-105"
                  }`}
                  onClick={() => setSelectedImage(null)}
                />
              </div>
              {/* Variant images */}
              {product.variants.slice(0, 3).map((variant, index) => (
                <div key={variant.id || index} className="relative mb-3">
                  <Image
                    width={32}
                    height={32}
                    src={
                      variant.base_image?.original_image_url ||
                      product?.base_image?.original_image_url ||
                      "/assets/images/product-card.jpg"
                    }
                    alt={`${product?.name || "Product"} variant ${index + 1}`}
                    className={`cursor-pointer transition-all duration-200 rounded-sm ${
                      selectedImage === index + 1
                        ? "ring-2 ring-gray-400 scale-110"
                        : "hover:scale-105"
                    }`}
                    onClick={() => setSelectedImage(index + 1)}
                  />
                </div>
              ))}
              {product.variants.length > 3 && (
                <Badge className="bg-transparent text-primary w-[32px] h-[32px] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-xs">
                  +{product.variants.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
