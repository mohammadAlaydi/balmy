"use client";

import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import DeleteProductComponent from "@/components/delete-product-component";
import { applyLocalQuantityDelta } from "@/store/slices/cart-slice";
import { useAppDispatch } from "@/store/hooks";
import ReactStars from "./react-stars";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useState, useMemo, useEffect } from "react";

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
  const dispatch = useAppDispatch();
  const { increaseOrDecreaseResponse, data } = useSelector((state: any) => state.cart);

  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const isLoading = loadingProductId === product?.id;
  // Derive current quantity from Redux (live) or fall back to prop
  const currentQty: number = useMemo(() => {
    // Prefer the canonical cart items in state.data, then fall back to the last
    // increase/decrease response mirror, then the prop quantity
    const fromCartData = data?.data?.items?.find(
      (i: any) => i?.additional?.product_id === product?.id || i?.product?.id === product?.id
    )?.quantity;

    const fromMirror = increaseOrDecreaseResponse?.data?.items?.find(
      (i: any) => i?.additional?.product_id === product?.id
    )?.quantity;

    const candidate = fromCartData ?? fromMirror ?? quantity ?? 0;
    const num =
      typeof candidate === "string" ? parseInt(candidate, 10) : candidate;
    return Number.isFinite(num) && num > 0 ? num : 0;
  }, [data, increaseOrDecreaseResponse, product?.id, quantity]);

  // Keep a local, optimistic quantity and batch deltas to avoid a request per click
  const [optimisticQty, setOptimisticQty] = useState<number | null>(null);
  const [pendingDelta, setPendingDelta] = useState<number>(0);

  // Whenever the store quantity changes (e.g., after a server sync), align the optimistic value
  useEffect(() => {
    if (optimisticQty === null) return; // user hasn't interacted yet
    // If store reflects the same value, clear local overrides
    if (currentQty === optimisticQty && pendingDelta === 0) {
      setOptimisticQty(null);
    }
  }, [currentQty, optimisticQty, pendingDelta]);

  const displayedQty = optimisticQty ?? currentQty;

  const handleClickChange = (delta: number) => {
    // Optimistic local update first (no request)
    try {
      setLoadingProductId(product?.id ?? null);
      // Prevent decreasing below 1 at UI level
      const next = (optimisticQty ?? currentQty) + delta;
      if (next < 1) {
        toast.error("لا يمكن أن تكون الكمية أقل من 1");
        setLoadingProductId(null);
        return;
      }
      setOptimisticQty(next);
      setPendingDelta((d) => d + delta);
      // Apply to shared store so Quick Cart and Cart reflect immediately
      dispatch(
        applyLocalQuantityDelta({ productId: product?.id, delta }) as any
      );
    } finally {
      // End the visual loading quickly; no network round-trip here
      setLoadingProductId(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full rounded-md border border-gray-200 p-4">
      {/* Product Info */}
      <div className="image-and-info-container flex flex-col-reverse md:flex-row gap-3 w-full justify-end">
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
            {product?.price} <i className="icon-rial"></i>
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
            onClick={() => handleClickChange(1)}
          />

          {/* Quantity */}
          <span
            className={`text-base font-[550] ${
              isLoading ? "text-gray-400" : ""
            }`}
          >
            {displayedQty}
          </span>

          {/* Decrease */}
          <TiMinus
            className={`text-2xl cursor-pointer border border-gray-200 rounded-full p-1 ${
              isLoading || displayedQty <= 1 ? "text-gray-400" : ""
            }`}
            onClick={() => handleClickChange(-1)}
          />
        </div>
      </div>
    </div>
  );
}
