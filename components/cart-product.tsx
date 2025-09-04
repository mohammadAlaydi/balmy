"use client";

import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import DeleteProductComponent from "@/components/delete-product-component";
import { addToCart } from "@/store/slices/cart-slice";
import { useAppDispatch } from "@/store/hooks";
import ReactStars from "./react-stars";

export default function CartProduct({
  maxHeight,
  data,
}: {
  maxHeight?: string;
  data: any;
}) {
  const [count, setCount] = React.useState(1);
  console.log(data, "😁😁😁😁");
  const dispatch = useAppDispatch();

  return (
    <div
      className={`col-span-12  lg:col-span-7 xl:col-span-8 flex flex-col gap-3 overflow-y-auto items-end ${
        maxHeight || "h-full"
      }`}
    >
      {" "}
      {data?.data?.items?.length > 0 &&
        data?.data?.items?.map((item: any) => (
          <div
            key={item?.product?.id}
            className="flex flex-col gap-3 w-full items-between rounded-md border border-gray-200 p-4"
          >
            <div className="flex gap-3 w-full justify-end">
              <div className="flex flex-col gap-2 flex-1">
                <p className="text-sm text-gray-color ltr:text-end rtl:text-start">
                  {item?.product?.category}
                </p>
                <h2 className="text-sm font-bold ltr:text-end rtl:text-start">
                  {item?.product?.name}
                </h2>
                <ReactStars rating={item?.product?.reviews?.total || 0} edit={false} />
                <p className="text-sm text-gray-color ltr:text-end rtl:text-start">
                  {item?.product?.price} ر.س
                </p>
              </div>
              <Image
                src={item?.product?.base_image?.original_image_url}
                alt={item?.product?.name}
                width={150}
                height={100}
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex gap-3 w-full justify-between items-center">
              <DeleteProductComponent productId={item?.id} />
              <div className="flex items-center gap-2">
                <FaPlus
                  className="text-2xl cursor-pointer border border-gray-200 rounded-full p-1"
                  onClick={() => {
                    dispatch(
                      addToCart({ productId: item?.id, productQTY: count + 1 })
                    );
                    setCount(Math.max(0, count + 1));
                  }}
                />
                <span className="text-base font-[550]">{item?.quantity}</span>

                <TiMinus
                  className="text-2xl cursor-pointer border border-gray-200 rounded-full p-1"
                  onClick={() => {
                    dispatch(
                      addToCart({
                        productId: item?.id,
                        productQTY: Math.max(0, count - 1),
                      })
                    );
                    setCount(Math.max(0, count - 1));
                  }}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
