"use client";

import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import DeleteProductComponent from "@/components/delete-product-component";
import { addToCart, getCartProducts } from "@/store/slices/cart-slice";
import { useAppDispatch } from "@/store/hooks";
import ReactStars from "./react-stars";
import { useSelector } from "react-redux";

export default function CartProduct({
  maxHeight,
  data,
}: {
  maxHeight?: string;
  data: any;
}) {
  const dispatch = useAppDispatch();
  const { increaseOrDecreaseQTYResponse } = useSelector((state: any) => state.cart)

  return (
    <div
      className={`col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col gap-3 overflow-y-auto items-end ${maxHeight || "h-full"
        }`}
    >
      {data?.data?.items?.length > 0 &&
        data?.data?.items?.map((item: any) => (
          <div
            key={item?.product?.id || item?.id}
            className="flex flex-col gap-3 w-full rounded-md border border-gray-200 p-4"
          >
            {/* Product Info */}
            <div className="flex gap-3 w-full justify-end">
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-sm text-gray-color ltr:text-end rtl:text-start">
                  {item?.product?.category}
                </p>
                <h2 className="text-sm font-bold ltr:text-end rtl:text-start">
                  {item?.product?.name}
                </h2>
                <ReactStars
                  rating={item?.product?.reviews?.total || 0}
                  edit={false}
                />
                <p className="text-sm text-gray-color ltr:text-end rtl:text-start">
                  {item?.product?.price} ر.س
                </p>
              </div>
              <Image
                src={item?.product?.base_image?.original_image_url}
                alt={item?.product?.name}
                width={120}
                height={120}
                className="rounded-md object-cover h-26 w-26 border-solid border-red-color border-[1px]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full justify-between items-center">
              <DeleteProductComponent productId={item?.id} />

              <div className="flex items-center gap-2">
                {/* Increase */}
                <FaPlus
                  className="text-2xl cursor-pointer border border-gray-200 rounded-full p-1"
                  onClick={async () => {
                    await dispatch(
                      addToCart({
                        productId: item?.product?.id
                        ,
                        productQTY:   1,
                      })
                    );
                    dispatch(getCartProducts())

                  }}
                />

                {/* Quantity */}
                <span className="text-base font-[550]">{item?.additional?.quantity}</span>

                {/* Decrease */}
                <TiMinus
                  className="text-2xl cursor-pointer border border-gray-200 rounded-full p-1"
                  onClick={async () => {
                    if (item?.quantity > 1) {
                      await dispatch(
                        addToCart({
                          productId: item?.product?.id
                          ,
                           productQTY: - 1,
                        })
                      );
                      dispatch(getCartProducts())
                      console.log(item?.additional?.quantity, "💛💛💛")
                    }

                  }}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
