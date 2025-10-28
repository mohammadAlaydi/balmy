"use client";

import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import DeleteProductComponent from "@/components/delete-product-component";
import {
  addToCart,
  getCartProducts,
  removeFromCart,
} from "@/store/slices/cart-slice";
import { useAppDispatch } from "@/store/hooks";
import ReactStars from "./react-stars";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { FavouriteButton } from "./favourite-button";
import { useRouter } from "next/navigation";

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
  const { increaseOrDecreaseResponse } = useSelector(
    (state: any) => state.cart
  );
  const tToast = useTranslations("toast");
  const [isOpen, setIsOpen] = useState(false);

  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const isLoading = loadingProductId === product?.id;

  const currentQty: number = useMemo(() => {
    const fromStore = increaseOrDecreaseResponse?.data?.items?.find(
      (i: any) => i?.additional?.product_id === product?.id
    )?.quantity;

    const candidate = fromStore ?? quantity ?? 0;
    const num =
      typeof candidate === "string" ? parseInt(candidate, 10) : candidate;
    return Number.isFinite(num) && num > 0 ? num : 0;
  }, [increaseOrDecreaseResponse, product?.id, quantity]);

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
  const handleDelete = async (productId: number | string) => {
    try {
      await dispatch(removeFromCart({ productId: Number(productId) })).unwrap();
      await dispatch(getCartProducts());
      toast.success(tToast("product-deleted"));
      if (status === "success") {
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };
  return (
    <div className="flex flex-col gap-3 w-full rounded-md border border-gray-200 p-3 sm:p-4">
      {/* Product Info */}
      <div className="flex flex-row gap-3 w-full justify-end items-start">
        <div className="flex flex-col gap-2 flex-1 items-start">
          <p className="text-xs sm:text-sm text-gray-color ltr:text-end rtl:text-start">
            {typeof product?.category === "string"
              ? product?.category
              : product?.category?.name ?? ""}
          </p>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <h2 className="text-sm md:font-bold line-clamp-2 ltr:text-start rtl:text-end overflow-hidden text-ellipsis whitespace-nowrap">
              {product?.name}
            </h2>
          </div>

          <div className="hidden sm:flex flex-col">
            <div className="scale-[0.85] sm:scale-100">
              <ReactStars rating={product?.reviews?.total || 0} edit={false} />
            </div>

            <p className="text-xs sm:text-sm md:text-base text-gray-color">
              {product?.price} <i className="icon-rial"></i>
            </p>
          </div>
        </div>
        <div className="relative group">
          <Image
            src={product?.base_image?.original_image_url ?? "/placeholder.png"}
            alt={product?.name ?? "product image"}
            width={100}
            height={100}
            className="rounded-md object-cover w-[110px] md:w-[140px] aspect-square border border-gray-200 cursor-pointer"
          />
          {/* Hover overlay with Favorite button */}
          <div
            onClick={() => router.push(`/product/${product?.id}`)}
            className="absolute inset-0 flex items-center justify-center invisible opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 cursor-pointer"
          >
            <FavouriteButton
              product={product}
              FaRegHeartColor="text-black"
              className="absolute right-0 top-0 rounded-none"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:hidden">
        <div className="scale-[0.85] sm:scale-100">
          <ReactStars rating={product?.reviews?.total || 0} edit={false} />
        </div>

        <p className="text-xs sm:text-sm md:text-base text-gray-color ltr:text-start rtl:text-end">
          {product?.price} <i className="icon-rial"></i>
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 w-full justify-between items-center mt-1 sm:mt-2">
        <DeleteProductComponent
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          action={() => handleDelete(deletedProductId)}
        />

        {/* Increment / Decrement */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Increase */}
          <FaPlus
            className={`text-lg sm:text-xl cursor-pointer border border-gray-200 rounded-full p-1 ${
              isLoading ? "text-gray-400" : ""
            }`}
            onClick={() => {
              if (!isLoading) {
                handleUpdateQuantity(product?.id, 1);
              } else {
                toast.error("يتم تنفيذ العملية الآن، برجاء الانتظار");
              }
            }}
          />

          {/* Quantity */}
          <span className="text-sm sm:text-base font-semibold">
            {currentQty}
          </span>

          {/* Decrease */}
          <TiMinus
            className={`text-lg sm:text-xl cursor-pointer border border-gray-200 rounded-full p-1 ${
              isLoading || currentQty <= 1 ? "text-gray-400" : ""
            }`}
            onClick={() => {
              if (!isLoading && currentQty > 1) {
                handleUpdateQuantity(product?.id, -1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
