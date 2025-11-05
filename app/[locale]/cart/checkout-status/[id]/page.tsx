"use client";

import PageWrapper from "@/components/page-wrapper";
import Loading from "@/components/loading";
import Success from "@/features/cart/success";
import Failed from "@/features/cart/failed";
import useCart from "@/hooks/use-cart";

export default function Page() {

  const {id , isLoading, orderDetails, saveOrderData } = useCart();

  if (isLoading) {
    return <Loading fullScreen variant="spinner" size="xl" />;
  }

  if (orderDetails != null) {
    return (
      <PageWrapper>
        <Success data={orderDetails} orderId={id} />
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
