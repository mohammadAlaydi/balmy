// "use client";

// import React, { useEffect, useLayoutEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";

// import PageWrapper from "@/components/page-wrapper";
// import Loading from "@/components/loading";
// import Success from "@/features/cart/checkout-dialog/success";
// import Failed from "@/features/cart/checkout-dialog/failed";
// import { getCartProducts } from "@/store/slices/cart-slice";

// interface CartState {
//   status: string | null;
//   saveOrderData: any;
//   data: any;
//   isLoading: boolean;
// }

// interface RootState {
//   cart: CartState;
// }

// export default function CheckoutStatusPage() {
//   const router = useRouter();
//   const t = useTranslations("order");
//   const dispatch = useDispatch();
//   const { status, saveOrderData, isLoading } = useSelector(
//     (state: RootState) => state.cart
//   );

//   // ✅ Redirect to home if accessed without checkout data
//   // useLayoutEffect(() => {
//   //   if (!isLoading && !status && !saveOrderData) {
//   //     router.replace("/home");
//   //   }
//   // }, [status, isLoading, saveOrderData, router]);

//   // ✅ If order is successful and has a payment redirect URL
//   useLayoutEffect(() => {
//     const success = saveOrderData?.data?.data?.success;
//     const url = saveOrderData?.data?.data?.url;
//     if (success && url) {
//       router.replace(url);
//     }
//   }, [saveOrderData, router]);

//   // ✅ Show loading spinner
//   if (isLoading) {
//     return <Loading fullScreen={true} variant="spinner" size="xl" />;
//   }

//   // ✅ Order success (no redirect URL)
//   if (saveOrderData?.success === true && !saveOrderData?.data?.data?.url) {
//     dispatch(getCartProducts() as any);
//     return (
//       <PageWrapper>
//         <Success data={saveOrderData} isLoading={isLoading} />
//       </PageWrapper>
//     );
//   }

//   // ✅ Order failed
//   if (saveOrderData?.success === false) {
//     return (
//       <PageWrapper>
//         <Failed />
//       </PageWrapper>
//     );
//   }

//   // ✅ Default / No active checkout session
//   return (
//     <PageWrapper>
//       <div className="flex flex-col items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">
//             {t("no-checkout-session")}
//           </h2>
//           <p className="text-sm sm:text-base text-gray-600 mb-4">
//             {t("complete-checkout-process")}
//           </p>
//           <button
//             onClick={() => router.push("/home")}
//             className="px-4 py-2 text-sm sm:text-base bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
//           >
//             {t("go-home")}
//           </button>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// }
"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import PageWrapper from "@/components/page-wrapper";
import Loading from "@/components/loading";
import Success from "@/features/cart/checkout-dialog/success";
import Failed from "@/features/cart/checkout-dialog/failed";
import { getCartProducts } from "@/store/slices/cart-slice";

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
  const t = useTranslations("order");
  const dispatch = useDispatch();
  const { status, saveOrderData, isLoading } = useSelector(
    (state: RootState) => state.cart
  );

  // ✅ Redirect to home if accessed without checkout data
  useEffect(() => {
    if (!isLoading && !status && !saveOrderData) {
      router.replace("/home");
    }
  }, [status, isLoading, saveOrderData, router]);

  // ✅ If order success and has a payment redirect URL
  useEffect(() => {
    const success = saveOrderData?.data?.data?.success;
    const url = saveOrderData?.data?.data?.url;
    if (success && url) {
      router.replace(url);
    }
  }, [saveOrderData, router]);

  // ✅ Loading state
  if (isLoading) {
    return <Loading fullScreen={true} variant="spinner" size="xl" />;
  }

  console.log(saveOrderData?.success, !saveOrderData?.data?.data?.url)
  // ✅ Order success (no redirect URL)
  if (saveOrderData?.success === true && !saveOrderData?.data?.url) {
    dispatch(getCartProducts() as any);
    return (
      <PageWrapper>
        <Success data={saveOrderData} />
      </PageWrapper>
    );
  }

  // ✅ Order failed
  if (saveOrderData?.success === false) {
    return (
      <PageWrapper>
        <Failed />
      </PageWrapper>
    );
  }

  // ✅ Default (no checkout session)
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
