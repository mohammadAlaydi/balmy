"use client";

import React from "react";
import { useSelector } from "react-redux";
import PageWrapper from "@/components/page-wrapper";
import Loading from "@/components/loading";
import Success from "@/features/cart/checkout-dialog/success";

interface CartState {
  status: string | null;
  saveOrderData: any;
  data: any;
  isLoading: boolean;
}

interface RootState {
  cart: CartState;
}

export default function page() {

  const { saveOrderData, isLoading } = useSelector(
    (state: RootState) => state.cart
  );

  if (isLoading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  return (
    <PageWrapper>
      <Success data={saveOrderData} />
    </PageWrapper>
  );
}
