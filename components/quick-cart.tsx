"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartProducts,
  removeAllProductsFromCart,
} from "@/store/slices/cart-slice";
import { useTranslations } from "next-intl";
import SectionTitle from "./section-title";
import CartProduct from "./cart-product";
import DeleteProductComponent from "./delete-product-component";

export default function QuickCart() {

  const t = useTranslations("cart");
  const dispatch = useDispatch();
  const { data, status } = useSelector((state: any) => state.cart);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const hasFetchedRef = useRef(false);
  const prevAuthRef = useRef(isAuthenticated);

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

  // Reset fetch flag and fetch cart when user logs in or registers
  // This ensures we get the correct cart for the new user session
  useEffect(() => {
    // Check if authentication status changed from false to true (login/register)
    if (!prevAuthRef.current && isAuthenticated) {
      // Reset the fetch flag so cart can be fetched again
      hasFetchedRef.current = false;
      // Fetch the cart for the new user
      dispatch(getCartProducts() as any);
    }
    // Update the previous auth state
    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  // if (isLoading) {
  //   return <Loading fullScreen={true} variant="spinner" size="xl" />;
  // }

  return (
    <div className="flex flex-col gap-4 items-center justify-between min-h-0 h-full">
      <div className="flex flex-col gap-4 w-full flex-1 min-h-0">
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
            {t("no-products-yet")}
          </p>
        )}
        <div className="cart-poroduct col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col gap-3 overflow-y-auto items-end flex-1 min-h-0">
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

      {/* Fixed bottom section for actions */}
      <div className="flex flex-col gap-3 w-full flex-shrink-0">
        {data?.data?.items?.length > 0 && (
          <DeleteProductComponent
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            action={() => dispatch(removeAllProductsFromCart() as any)}
            text={t("clear-all-products")}
            deleteMessage="delete-all-products"
          />
        )}
        {data?.data?.items?.length > 0 && (
          <div className="flex gap-2 justify-center">
            <Link
              prefetch={true}
              href="/cart"
              className="w-full text-center md:text-sm text-xs bg-black text-white px-4 py-2 rounded-md hover:bg-black/80 border border-black hover:text-white transition-all duration-300"
            >
              {t("go-to-cart")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
