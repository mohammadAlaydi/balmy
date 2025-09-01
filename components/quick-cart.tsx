"use client";

import Link from "next/link";
import React from "react";
import CartProduct from "./cart-product";

export default function QuickCart() {
  return (
    <div className="flex flex-col gap-4 items-center justify-between h-full ">
      <div className="flex flex-col gap-4 flex-1 h-full w-full">
        <h1 className="text-2xl font-bold text-center">إلقاء نظرة سريعة </h1>
        <p className="text-sm text-gray-500 text-center">
          تم إضافة المنتجات التالية لسلة التسوق
        </p>
        <CartProduct />
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
