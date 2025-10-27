"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import PageWrapper from "@/components/page-wrapper";
import Loading from "@/components/loading";

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

  const router = useRouter();
  const t = useTranslations("order");
  const { isLoading } = useSelector(
    (state: RootState) => state.cart
  );

  if (isLoading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">
            {t("no-checkout-session")}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {t("complete-checkout-process")}
          </p>
          <button
            onClick={() => router.push("/home")}
            className="px-4 py-2 text-sm sm:text-base bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            {t("go-home")}
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
