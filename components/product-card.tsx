"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoHeartCircle } from "react-icons/io5";
import { toast } from "sonner";
import DrawerComponent from "./layout/drawer/drawer-component";
import QuickProductDetails from "./quick-product-details";

// Define proper types for the product
interface Product {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  priceEn: string;
  code: string;
  images: string[];
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  width?: string;
}

export default function ProductCard({ product, width }: ProductCardProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = product.images || [
    "/assets/images/product-card.jpg",
    "/assets/images/hover-product-card.jpg",
    "/assets/images/product-card.jpg",
  ];

  const handleAddToFavorites = () => {
    toast.success(`تم إضافة ${product.name} - ${product.code} للمفضلة بنجاح`, {
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <Card
      className={`w-56 shadow-[0px_6px_20px_rgba(149,157,165,0.1)] py-0 h-fit border-none gap-0 group relative ${width} border border-gray-200 rounded-lg border-solid border-[1px]`}
    >
      <CardHeader className="p-0 relative group">
        <div className="absolute top-2 ltr:left-2 rtl:right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <IoHeartCircle
            className="text-3xl cursor-pointer text-black drop-shadow-lg hidden md:flex"
            onClick={handleAddToFavorites}
          />
        </div>
        <Image
          width={224}
          height={224}
          src={images[selectedImage]}
          alt={`${product.name} - ${product.code}`}
          className="rounded-t-lg w-full h-auto aspect-square object-cover transition-all duration-300"
        />
        <Image
          width={224}
          height={224}
          src="/assets/images/hover-product-card.jpg"
          alt={`${product.name} hover - ${product.code}`}
          className="absolute inset-0 rounded-t-lg w-full h-auto aspect-square object-cover transition-all duration-300 opacity-0 group-hover:opacity-100"
        />
        <DrawerComponent
          trigger={
            <Button className="absolute bottom-0 left-0 w-full rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/85 text-white hidden md:flex">
              أضف للسلة <MdOutlineShoppingCart className="text-xl" />
            </Button>
          }
        >
          <QuickProductDetails product={product} />
        </DrawerComponent>
      </CardHeader>
      <CardContent className="px-2 pt-4 flex flex-col gap-4 justify-start">
        <p className="font-[650] text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {product.name}
        </p>
        <p className="text-sm">{product.price} ج.م</p>
        <div className="flex items-center gap-2 my-1 hidden md:flex group-hover:hidden transition-all duration-300">
          {images.map((image: string, index: number) => (
            <div key={index} className="relative">
              <Image
                width={35}
                height={35}
                src={image}
                alt={`${product.name} variant ${index + 1}`}
                className={`cursor-pointer transition-all duration-200 rounded-sm ${
                  selectedImage === index
                    ? "ring-2 ring-gray-400 scale-110"
                    : "hover:scale-105"
                }`}
                onClick={() => setSelectedImage(index)}
              />
            </div>
          ))}
          <Badge className="bg-transparent text-primary w-[32px] h-[32px] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] text-xs">
            +4
          </Badge>
        </div>
        <div className="flex justify-between items-center py-2">
          <p className="flex md:hidden group-hover:flex transition-all duration-300">
            <Badge className="bg-transparent text-sm md:text-base text-black p-0">
              كود
            </Badge>
            <Badge className="bg-transparent text-sm md:text-base text-black px-1">
              :
            </Badge>
            <Badge className="bg-transparent text-sm md:text-base text-black p-0">
              {product.code}
            </Badge>
          </p>
          <div className="flex items-center gap-2 md:hidden">
            <MdOutlineShoppingCart className="md:text-3xl text-2xl cursor-pointer" />
            <IoHeartCircle className="md:text-3xl text-2xl cursor-pointer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
