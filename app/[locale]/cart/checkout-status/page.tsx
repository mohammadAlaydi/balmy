"use client";

import Failed from "@/features/cart/checkout-dialog/failed";
import Success from "@/features/cart/checkout-dialog/success";
import { useSelector } from "react-redux";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/components/loading";
import PageWrapper from "@/components/page-wrapper";

interface CartState {
  status: string | null;
  saveOrderData: any;
  data: any;
  isLoading: boolean;
}

interface RootState {
  cart: CartState;
}

export default function CheckoutStatusPage() {
  const router = useRouter();
  const { status, saveOrderData, isLoading } = useSelector((state: RootState) => state.cart);

  // Redirect to cart if no checkout status is available
  useEffect(() => {
    if (!status && !isLoading) {
      router.push("/home");
    }
  }, [status, isLoading, router]);

  // Show loading while processing
  if (isLoading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }
 
  if (status === "success") {
    return (
      <PageWrapper>
        <Success data={saveOrderData} />
      </PageWrapper>
    );
  }
  
  if (status === "failed") {
    return (
      <PageWrapper>
        <Failed />
      </PageWrapper>
    );
  }

  // Fallback render when status is null but not loading
  // This handles the case where user navigates directly to this page
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No checkout session found
          </h2>
          <p className="text-gray-600 mb-4">
            Please complete a checkout process to view the status.
          </p>
          <button
            onClick={() => router.push("/home")}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
