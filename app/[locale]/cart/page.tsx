"use client";

import PagePadding from "@/components/page-padding";
import CartProducts from "@/components/cart-product";
import OrderSummary from "@/features/cart/order-Summary";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartProducts } from "@/store/slices/cart-slice";

export default function CartPage() {

  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.cart);

  useEffect(() => {
    dispatch(getCartProducts() as any);
  }, [dispatch]);

  return (
    <PagePadding>
      {data && data?.data?.items?.length > 0 ? (
        <div className="grid grid-cols-12 xl:max-w-7xl mx-auto gap-5 justify-between">
          <OrderSummary data={data} />
          <CartProducts data={data} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full min-h-[65vh]">
          <p className="text-base md:text-lg xl:text-xl text-center">
            No data found
          </p>
        </div>
      )}
    </PagePadding>
  );
}
