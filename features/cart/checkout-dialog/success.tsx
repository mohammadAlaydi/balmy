// "use client";

// import { FaCheck } from "react-icons/fa";
// import { SuccessProps } from "@/types/types";
// import { useDispatch } from "react-redux";
// import { resetStatus } from "@/store/slices/cart-slice";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
// import Loading from "@/components/loading";

// export default function Success({ data  , isLoading}: SuccessProps) {
//   const t = useTranslations("order");

//   // Handle different data structures
//   const order = data?.data?.data?.order;
//   // If no order data, show error

//   const orderInfoItems = [
//     { label: t("order-number"), value: `#${order.id}` },
//     { label: t("order-status"), value: order.status },
//     { label: t("shipping-method"), value: order.shipping_method },
//     {
//       label: t("shipping-amount"),
//       value:
//         order.shipping_amount +
//         " " +
//         ((order as any)?.channel_currency_code || ""),
//     },
//     { label: t("payment-title"), value: order.payment_title },
//   ];
//   if (data?.data?.data?.success && data?.data?.data?.url && isLoading) {
//     return <Loading fullScreen={true} variant="spinner" size="xl" />;
//   }
//   if (data?.data?.success && data?.data?.data?.url == null) {
//     return (
//       <div className="flex flex-col items-center justify-center bg-white p-4 sm:p-6 md:p-8">
//         <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
//           <SuccessHeader />
//           <OrderInfoSection orderInfoItems={orderInfoItems} />
//           <ActionSection />
//         </div>
//       </div>
//     );
//   }
// }

// function SuccessHeader() {
//   const t = useTranslations("order");

//   return (
//     <div className="px-6 py-12 flex flex-col items-center justify-center space-y-4">
//       <div className="bg-green-500 p-4 rounded-full">
//         <FaCheck className="h-6 w-6 text-white" />
//       </div>
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//         {t("shipping-successful")}
//       </h1>
//       <p className="text-sm sm:text-base text-gray-600 text-center">
//         {t("shipping-successful-desc")}
//       </p>
//     </div>
//   );
// }

// interface OrderInfoSectionProps {
//   orderInfoItems: Array<{ label: string; value: string }>;
// }

// function OrderInfoSection({ orderInfoItems }: OrderInfoSectionProps) {
//   return (
//     <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col gap-4">
//       {orderInfoItems.map((item, index) => (
//         <div className="flex justify-between gap-3 items-center" key={index}>
//           <p className="text-xs sm:text-sm text-gray-500 rtl:order-1 rtl:text-right ltr:order-1 ltr:text-left">
//             {item.label}
//           </p>
//           <p className="text-sm sm:text-base text-gray-900 font-medium rtl:order-2 rtl:text-right ltr:order-2 ltr:text-left">
//             {item.value}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// function ActionSection() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const t = useTranslations("order");

//   const handleResetAndClose = () => {
//     dispatch(resetStatus());
//   };

//   const handleGoHome = () => {
//     dispatch(resetStatus());
//     router.push("/home");
//   };

//   return (
//     <div className="px-6 py-4 flex flex-col gap-3">
//       <button
//         onClick={handleGoHome}
//         className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-xs sm:text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:pointer-events-none disabled:opacity-50"
//       >
//         {t("go-home")}
//       </button>
//       <button
//         onClick={handleResetAndClose}
//         className="inline-flex h-10 items-center justify-center rounded-md bg-gray-200 px-6 text-xs sm:text-sm font-medium text-gray-700 shadow transition-colors hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 disabled:pointer-events-none disabled:opacity-50"
//       >
//         {t("close-dialog")}
//       </button>
//     </div>
//   );
// }
"use client";

import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { resetStatus } from "@/store/slices/cart-slice";
import { RootState } from "@reduxjs/toolkit/query";

export default function Success() {
  
  const { saveOrderData } = useSelector((state: RootState) => state.cart);
  const t = useTranslations("order");

  const order = saveOrderData?.data?.data?.order;

  const orderInfoItems = [
    { label: t("order-number"), value: `#${order.id}` },
    { label: t("order-status"), value: order.status },
    { label: t("shipping-method"), value: order.shipping_method },
    {
      label: t("shipping-amount"),
      value: order.shipping_amount + " " + (order?.channel_currency_code || ""),
    },
    { label: t("payment-title"), value: order.payment_title },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 sm:p-6 md:p-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <SuccessHeader />
        <OrderInfoSection orderInfoItems={orderInfoItems} />
        <ActionSection />
      </div>
    </div>
  );
}

function SuccessHeader() {
  const t = useTranslations("order");

  return (
    <div className="px-6 py-12 flex flex-col items-center justify-center space-y-4">
      <div className="bg-green-500 p-4 rounded-full">
        <FaCheck className="h-6 w-6 text-white" />
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
        {t("shipping-successful")}
      </h1>
      <p className="text-sm sm:text-base text-gray-600 text-center">
        {t("shipping-successful-desc")}
      </p>
    </div>
  );
}

interface OrderInfoSectionProps {
  orderInfoItems: Array<{ label: string; value: string }>;
}

function OrderInfoSection({ orderInfoItems }: OrderInfoSectionProps) {
  return (
    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col gap-4">
      {orderInfoItems.map((item, index) => (
        <div className="flex justify-between gap-3 items-center" key={index}>
          <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
          <p className="text-sm sm:text-base text-gray-900 font-medium">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function ActionSection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("order");

  const handleGoHome = () => {
    dispatch(resetStatus());
    router.push("/home");
  };

  const handleClose = () => {
    dispatch(resetStatus());
  };

  return (
    <div className="px-6 py-4 flex flex-col gap-3">
      <button
        onClick={handleGoHome}
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-xs sm:text-sm font-medium text-white shadow hover:bg-gray-800 transition-colors"
      >
        {t("go-home")}
      </button>
      <button
        onClick={handleClose}
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-200 px-6 text-xs sm:text-sm font-medium text-gray-700 shadow hover:bg-gray-300 transition-colors"
      >
        {t("close-dialog")}
      </button>
    </div>
  );
}
