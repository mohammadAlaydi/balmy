"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import CartProduct from "./cart-product";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "@/store/slices/cart-slice";
import { useTranslations } from "next-intl";
import SectionTitle from "./section-title";

export default function QuickCart() {
  const t = useTranslations("cart");
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.cart);

  useEffect(() => {
    dispatch(getCartProducts() as any);
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4 items-center justify-between h-full ">
      <div className="flex flex-col gap-4 flex-1 h-full w-full">
        <SectionTitle
          title={t("quick-look")}
          titleStyle="text-center xl:text-2xl md:text-xl sm:text-lg text-base font-bold"
        />
        {data && data?.data?.items?.length > 0 && (
          <p className=" md:text-sm text-xs text-gray-500 text-center">
            {t("products-added-to-cart")}
          </p>
        )}
        <CartProduct data={data || []} />
      </div>
      <div className="flex gap-2">
        <Link
          href="/cart"
          className="text-nowrap md:text-sm text-xs bg-black text-white px-4 py-2 rounded-md hover:bg-white border border-black hover:text-black transition-all duration-300"
        >
          {t("go-to-cart")}
        </Link>
      </div>
    </div>
  );
}
