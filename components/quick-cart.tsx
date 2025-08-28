"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { quickCartProducts } from "@/static-data/static-data";
import DeleteProductComponent from "./delete-product-component";

export default function QuickCart() {
  const [count, setCount] = React.useState(400); 

  return (
    <div className="flex flex-col gap-4 items-center justify-between h-full">
      <div className="flex flex-col gap-4 flex-1 h-full w-full">
        <h1 className="text-2xl font-bold text-center">إلقاء نظرة سريعة </h1>
        <p className="text-sm text-gray-500 text-center">
          تم إضافة المنتجات التالية لسلة التسوق
        </p>
        {quickCartProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-3 w-full items-between rounded-md border border-gray-color p-4"
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
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
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
      <div className="flex gap-2">
        <Link
          href="/cart"
          className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300"
        >
          الذهاب للسلة
        </Link>
      </div>
    </div>
  );
}
