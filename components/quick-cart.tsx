"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartProducts,
  removeAllProductsFromCart,
} from "@/store/slices/cart-slice";
import { useTranslations } from "next-intl";
import SectionTitle from "./section-title";
import Loading from "./loading";
import CartProduct from "./cart-product";
import { MdDeleteSweep } from "react-icons/md";

export default function QuickCart() {
  const t = useTranslations("cart");
  const dispatch = useDispatch();
  const { data, isLoading, status, cartStatus } = useSelector(
    (state: any) => state.cart
  );
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    if (
      !hasFetchedRef.current &&
      (data === null || data?.data?.items == null)
    ) {
      hasFetchedRef.current = true;
      dispatch(getCartProducts() as any);
    }
  }, [dispatch, data]);

  // Refresh cart when order is successful (not cart operations)
  useEffect(() => {
    if (status === "success") {
      dispatch(getCartProducts() as any);
    }
  }, [status, dispatch]);

  if (isLoading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }
  return (
   
    <div className="flex flex-col gap-4 items-center justify-between h-full ">
      <div className="flex flex-col gap-4 flex-1 h-full w-full">
        <SectionTitle
          title={t("quick-look")}
          titleStyle="text-center xl:text-2xl md:text-xl sm:text-lg text-base font-bold"
        />
        {data && data?.data?.items?.length > 0 ? (
          <p className=" md:text-sm text-xs text-gray-500 text-center">
            {t("products-added-to-cart")}
          </p>
        ) : (
          <p className="text-red-color font-[600] text-center w-full">
            لا يوجد منتجات حتى الان
          </p>
        )}
        <div
          className={`cart-poroduct col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col gap-3 overflow-y-auto items-end max-h-[75vh]
       
      `}
        >
          {data?.data?.items &&
            data?.data?.items.length > 0 &&
            data.data.items.map((item: any) => (
              <CartProduct
                key={item?.product?.id}
                product={item?.product}
                quantity={item?.quantity}
                deletedProductId={item?.id}
              />
            ))}
        </div>
      </div>
      {data?.data?.items?.length > 0 && (
        <div className="flex justify-start w-full cursor-pointer">
          <MdDeleteSweep
            className="text-red-500 text-3xl"
            onClick={() => dispatch(removeAllProductsFromCart() as any)}
          />
        </div>
      )}
      {data?.data?.items?.length > 0 && (
        <div className="flex gap-2">
          <Link
            prefetch={true}
            href="/cart"
            className="text-nowrap md:text-sm text-xs bg-black text-white px-4 py-2 rounded-md hover:bg-black/80 border border-black hover:text-white transition-all duration-300"
          >
            {t("go-to-cart")}
          </Link>
        </div>
      )}
    </div>
  );
}
