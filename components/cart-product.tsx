"use client";

import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import DeleteProductComponent from "@/components/delete-product-component";
import { addToCart } from "@/store/slices/cart-slice";
import { useAppDispatch } from "@/store/hooks";
import ReactStars from "./react-stars";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useState, useMemo } from "react";

interface CartProductProps {
  product: any;
  quantity: number | string;
  deletedProductId :  number | string
}

export default function CartProduct({ product, quantity , deletedProductId }: CartProductProps) {
  const dispatch = useAppDispatch();
  const { increaseOrDecreaseResponse } = useSelector(
    (state: any) => state.cart
  );

  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const isLoading = loadingProductId === product?.id;

  // Derive current quantity from Redux (live) or fall back to prop
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

  return (
    <div className="flex flex-col gap-3 w-full rounded-md border border-gray-200 p-4">
      {/* Product Info */}
      <div className="image-and-info-container flex flex-col-reverse gap-3 w-full justify-end">
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm text-gray-color ltr:text-end rtl:text-start">
            {typeof product?.category === "string"
              ? product?.category
              : product?.category?.name ?? ""}
          </p>
          <h2 className="text-sm font-bold ltr:text-start rtl:text-end">
            {product?.name}
          </h2>
          <ReactStars rating={product?.reviews?.total || 0} edit={false} />
          <p className="text-sm text-gray-color ltr:text-start rtl:text-end">
            {typeof product?.price === "number"
              ? `${product?.price} ر.س`
              : product?.price?.formatted ?? ""}
          </p>
        </div>
        <Image
          src={product?.base_image?.original_image_url ?? "/placeholder.png"}
          alt={product?.name ?? "product image"}
          width={120}
          height={120}
          className="photo rounded-md object-cover w-full sm:w-28 aspect-square border border-red-color"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 w-full justify-between items-center">
        <DeleteProductComponent productId={deletedProductId} />
        {/* increment or decrement */}
        <div className="flex items-center gap-2">
          {/* Increase */}
          <FaPlus
            className={`text-2xl cursor-pointer border border-gray-200 rounded-full p-1 ${
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
          <span
            className={`text-base font-[550] ${
              isLoading ? "text-gray-400" : ""
            }`}
          >
            {currentQty}
          </span>

          {/* Decrease */}
          <TiMinus
            className={`text-2xl cursor-pointer border border-gray-200 rounded-full p-1 ${
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
