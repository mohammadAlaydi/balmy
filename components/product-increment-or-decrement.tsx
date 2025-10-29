"use client";

import { addToCart } from "@/store/slices/cart-slice";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

export default function ProductIncementOrDecrement({
  product,
  quantity,
}: {
  product: any;
  quantity: number | string;
}) {
  const dispatch = useDispatch();
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const isLoading = loadingProductId === product?.id;
  const { increaseOrDecreaseResponse } = useSelector(
    (state: any) => state.cart
  );

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
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Increase */}
      <FaPlus
        className={`text-lg sm:text-xl cursor-pointer p-1 ${
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
      <span className="text-sm sm:text-base font-semibold">{currentQty}</span>

      {/* Decrease */}
      <TiMinus
        className={`text-lg sm:text-xl cursor-pointer  p-1 ${
          isLoading || currentQty <= 1 ? "text-gray-400" : ""
        }`}
        onClick={() => {
          if (!isLoading && currentQty > 1) {
            handleUpdateQuantity(product?.id, -1);
          }
        }}
      />
    </div>
  );
}
