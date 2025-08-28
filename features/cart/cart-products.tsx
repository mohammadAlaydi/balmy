"use client";

import { products } from "@/static-data/static-data";
import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";

import DeleteProductComponent from "@/components/delete-product-component";

export default function CartProducts() {
  const [count, setCount] = React.useState(1);
  return (
    <div className="flex flex-col gap-3 xl:col-span-6 col-span-9">
      {" "}
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col gap-3 w-full items-between rounded-md border border-gray-200 p-4"
        >
          <div className="flex gap-3 w-full justify-end">
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-sm text-gray-color ltr:text-end rtl:text-start">
                {product.category}
              </p>
              <h2 className="text-sm font-bold ltr:text-end rtl:text-start">
                {product.name}
              </h2>
              <p className="text-sm text-gray-color ltr:text-end rtl:text-start">
                {product.price} ر.س
              </p>
            </div>
            <Image
              src={product.images[0]}
              alt={product.name}
              width={170}
              height={170}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex gap-3 w-full justify-between items-center">
            <DeleteProductComponent />
            <div className="flex items-center gap-2">
              <FaPlus
                className="text-sm cursor-pointer"
                onClick={() => setCount(count + 1)}
              />
              <span className="text-base font-[550]">{count}</span>

              <TiMinus
                className="text-sm cursor-pointer"
                onClick={() => setCount(Math.max(0, count - 1))}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
