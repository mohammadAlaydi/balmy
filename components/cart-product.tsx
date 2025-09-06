"use client";

import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import DeleteProductComponent from "@/components/delete-product-component";
import { addToCart } from "@/store/slices/cart-slice";
import { useAppDispatch } from "@/store/hooks";
import ReactStars from "./react-stars";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useState } from "react";

interface CartProductProps {
  maxHeight?: string;
  data: any;
}

export default function CartProduct({ maxHeight, data }: CartProductProps) {
  const totalQTY = 3;
  const dispatch = useAppDispatch();
  const { increaseOrDecreaseResponse } = useSelector(
    (state: any) => state.cart
  );

  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);

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
    <div
      className={`cart-poroduct col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col gap-3 overflow-y-auto items-end ${
        maxHeight || "h-full"
      }`}
    >
      {data?.data?.items?.length > 0 &&
        data.data.items.map((item: any) => {
          const product = item?.product;
          const quantity =
            increaseOrDecreaseResponse?.data?.items?.find(
              (i: any) => i.additional.product_id === product?.id
            )?.quantity ?? 0;

          const isLoading = loadingProductId === product?.id;

          return (
            <div
              key={product?.id || item?.id}
              className="flex flex-col gap-3 w-full rounded-md border border-gray-200 p-4"
            >
              {/* Product Info */}
              <div className="image-and-info-container flex flex-col-reverse gap-3 w-full justify-end">
                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-sm text-gray-color ltr:text-end rtl:text-start">
                    {product?.category}
                  </p>
                  <h2 className="text-sm font-bold ltr:text-start rtl:text-end">
                    {product?.name}
                  </h2>
                  <ReactStars
                    rating={product?.reviews?.total || 0}
                    edit={false}
                  />
                  <p className="text-sm text-gray-color ltr:text-start rtl:text-end">
                    {product?.price} ر.س
                  </p>
                </div>
                <Image
                  src={product?.base_image?.original_image_url}
                  alt={product?.name}
                  width={120}
                  height={120}
                  className="photo rounded-md object-cover w-full aspect-squareh-28 sm:w-28  border border-red-color"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 w-full justify-between items-center">
                <DeleteProductComponent productId={item?.id} />
                <div className="flex items-center gap-2">
                  {/* Increase */}
                  <FaPlus
                    className={`text-2xl cursor-pointer border border-gray-200 rounded-full p-1 ${
                      isLoading || quantity === totalQTY ? "text-gray-400" : ""
                    }`}
                    onClick={() => {
                      if (!isLoading) {
                        if (quantity < totalQTY) {
                          handleUpdateQuantity(product?.id, 1);
                        } else {
                          toast.success("لقد وصلت الحد الأقصى من هذا المنتج");
                        }
                      }
                    }}
                  />
                  {/* Quantity */}
                  <span
                    className={`text-base font-[550] ${
                      isLoading ? "text-gray-400" : ""
                    }`}
                  >
                    {quantity}
                  </span>
                  {/* Decrease */}
                  <TiMinus
                    className={`text-2xl cursor-pointer border border-gray-200 rounded-full p-1 ${
                      isLoading || quantity === 1 ? "text-gray-400" : ""
                    }`}
                    onClick={() => {
                      if (!isLoading && quantity > 1) {
                        handleUpdateQuantity(product?.id, -1);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
