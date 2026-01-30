"use client";

import CartSectionBalmy from "@/components/balmy/cart-section-balmy";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { getCartProducts } from "@/store/slices/cart-slice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { data: cartData, isLoading } = useSelector((state: any) => state.cart);

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  return (
    <main dir="rtl" className="container mx-auto px-4 w-full">
      <CartSectionBalmy
        data={cartData}
        breadcrumb={<BreadcrumbNav items={[{ label: "الرئيسية", href: "/" }, { label: "السلة" }]} />}
      />
    </main>
  );
}
