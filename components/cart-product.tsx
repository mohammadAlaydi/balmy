"use client";

import Image from "next/image";
import DeleteProductComponent from "@/components/delete-product-component";
import { getCartProducts, removeFromCart } from "@/store/slices/cart-slice";
import { useAppDispatch } from "@/store/hooks";
import { Rating, RatingButton } from "./ui/rating";
import toast from "react-hot-toast";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { useRouter } from "next/navigation";
import ProductIncementOrDecrement from "./product-increment-or-decrement";
import { Badge } from "./ui/badge";

interface CartProductProps {
  product: any;
  quantity: number | string;
  deletedProductId: number | string;
}

export default function CartProduct({
  product,
  quantity,
  deletedProductId,
}: CartProductProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const tToast = useTranslations("toast");
  const tProducts = useTranslations("products");
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (productId: number | string) => {
    try {
      await dispatch(removeFromCart({ productId: Number(productId) })).unwrap();
      await dispatch(getCartProducts());
      toast.success(tToast("product-deleted"));
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full rounded-md border border-gray-200 p-3 sm:p-4">
      {/* Product Info */}
      <div className="flex flex-row gap-3 w-full justify-end items-start">
        <div className="flex flex-col gap-2 flex-1 items-start">
          <p className="font-semibold text-sm truncate">
            {typeof product?.category === "string"
              ? product?.category
              : product?.category?.name ?? ""}
          </p>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <h2 className="tfont-semibold text-sm truncate max-w-[150px]">
              {product?.name}
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm md:text-base text-gray-color">
              {product?.price} <i className="icon-rial"></i>
            </p>
            <div className="scale-[0.85] sm:scale-100">
              <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full w-fit shadow-sm">
                <Rating readOnly value={Math.floor(Number((product as any)?.reviews?.average_rating || product?.rating || 4.5))} max={5}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <RatingButton key={i} size={14} />
                  ))}
                </Rating>
                <Badge className="bg-transparent text-gray-500 p-0 text-sm font-[550]">
                  {(product as any)?.reviews?.average_rating || product?.rating || 4.5}
                </Badge>
              </div>

            </div>
            {/* Stock Status */}
            <Badge
              className={`text-sm px-3 py-1 rounded ${product.in_stock
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-red-100 text-red-800 border-red-200"
                }`}
            >
              {product.in_stock
                ? tProducts("in-stock")
                : tProducts("out-of-stock")}
            </Badge>

          </div>
        </div>
        <div className="relative group">
          <Image
            src={product?.base_image?.original_image_url ?? "/placeholder.png"}
            alt={product?.name ?? tProducts("product")}
            width={100}
            height={100}
            className="rounded-md object-cover w-[110px] md:w-[140px] aspect-square border border-gray-200 cursor-pointer"
          />

        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 w-full justify-between items-end mt-1 sm:mt-2">
        <DeleteProductComponent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          action={() => handleDelete(deletedProductId)}
        />
        {/* Increment / Decrement */}
        <div className="bg-[#3866df] text-white py-1 px-2 rounded-md">
          <ProductIncementOrDecrement product={product} quantity={quantity} />
        </div>
      </div>
    </div>
  );
}
