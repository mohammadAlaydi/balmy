"use client";

import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "@/components/page-wrapper";
import Loading from "@/components/loading";
import Success from "@/features/cart/success";
import { getOrderById } from "@/store/slices/cart-slice";
import type { RootState, AppDispatch } from "@/store";
import Failed from "@/features/cart/failed";

export default function Page({ params }: { params: { id: string } }) {
  const dispatch = useDispatch<AppDispatch>();
  const { saveOrderData, isLoading, orderDetails } = useSelector(
    (state: RootState) => state.cart
  );

  useLayoutEffect(() => {
    if (params?.id) {
      dispatch(getOrderById(params.id) as any);
    }
  }, [params?.id, dispatch]);

  if (isLoading) {
    return <Loading fullScreen variant="spinner" size="xl" />;
  }
  console.log(orderDetails, "🤷‍♂️😂");
  if (orderDetails != null) {
    return (
      <PageWrapper>
        <Success data={orderDetails} orderId={params.id} />
      </PageWrapper>
    );
  }
  if (saveOrderData?.success == false) {
    return (
      <PageWrapper>
        <Failed />
      </PageWrapper>
    );
  }
}
