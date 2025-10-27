// "use client";

// import { defineStepper } from "@/components/ui/stepper";
// import z from "zod";
// import { formSchema } from "./schemas";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import ShippingForm from "./shipping-form";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   saveOrder,
//   getCartProducts,
//   resetStatus,
// } from "@/store/slices/cart-slice";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { useTranslations } from "next-intl";
// import AuthModal from "@/components/auth/auth-modal";
// import PageWrapper from "@/components/page-wrapper";
// import Success from "./success";
// import Failed from "./failed";
// import Loading from "@/components/loading";

// export type CheckoutFormValues = z.infer<typeof formSchema>;

// const defaultFormValues: CheckoutFormValues = {
//   billing: {
//     first_name: "",
//     last_name: "",
//     email: "",
//     address1: "",
//     city: "",
//     phone: "",
//     use_for_shipping: true,
//   },
//   shipping: {
//     address1: "",
//     city: "",
//     phone: "",
//   },
//   payment: {
//     method: "cashondelivery" as const,
//   },
//   shipping_method: "flatrate_flatrate" as const,
// };

// export default function Checkout({
//   total,
//   data,
// }: {
//   total: number;
//   data: any;
// }) {
//   const router = useRouter();
//   const t = useTranslations("cart");
//   const tButtons = useTranslations("buttons");
//   const dispatch = useDispatch();
//   const [redirecting, setRedirecting] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const { Stepper } = defineStepper(
//     { id: "shipping", title: t("shipping") },
//     { id: "payment", title: t("payment") }
//   );

//   const form = useForm<CheckoutFormValues>({
//     resolver: zodResolver(formSchema),
//     mode: "onChange",
//     defaultValues: defaultFormValues,
//   });

//   const { watch } = form;

//   const { saveOrderData, isLoading, status } = useSelector(
//     (state: any) => state.cart
//   );
//   const success = saveOrderData?.data?.data?.success;
//   const url = saveOrderData?.data?.data?.url != null;

//   const { isAuthenticated: authStatus, user } = useSelector(
//     (state: any) => state.auth
//   );

//   useEffect(() => {
//     setIsAuthenticated(authStatus && !!user);
//   }, [authStatus, user]);

//   const onSubmit = async (values: CheckoutFormValues) => {
//     if (!isAuthenticated) {
//       setShowAuthModal(true);
//       return;
//     }

//     const { use_for_shipping, ...billingWithoutFlag } = values.billing;

//     const shippingData = use_for_shipping
//       ? {
//           address1: values.billing.address1,
//           city: values.billing.city,
//           phone: values.billing.phone,
//         }
//       : values.shipping;

//     const checkoutPayload = {
//       billing: billingWithoutFlag,
//       shipping: shippingData,
//       payment: values.payment,
//       shipping_method: values.shipping_method,
//     };
//     await dispatch(saveOrder(checkoutPayload) as any);
//     dispatch(resetStatus());
//   };

//   // Redirect immediately if URL exists
//   useEffect(() => {
//     if (success && saveOrderData?.data?.data?.url) {
//       setRedirecting(true);
//       router.push(saveOrderData?.data?.data?.url);
//     }
//   }, [success, saveOrderData?.data?.data?.url, router]);

//   // Show loading during redirect or while saving
//   if (isLoading || redirecting) {
//     return <Loading fullScreen={true} variant="spinner" size="xl" />;
//   }

//   // Show Success page only if order succeeded AND no redirect URL
//   const paymentMethod = watch("payment.method");
//   useEffect(() => {
//     if (paymentMethod === "tabby" || paymentMethod === "cashondelivery") {
//       dispatch(getCartProducts() as any);
//     }
//   }, [paymentMethod, dispatch]);

//   // Show Failed page if order failed
//   if (saveOrderData?.success === false) {
//     return (
//       <PageWrapper>
//         <Failed />
//       </PageWrapper>
//     );
//   }
//   return (
//     <>
//       {!isAuthenticated ? (
//         <div className="flex flex-col items-center justify-center p-8 text-center">
//           <h3 className="text-lg font-semibold mb-4">{t("login-required")}</h3>
//           <p className="text-gray-600 mb-6">{t("please-login-to-checkout")}</p>
//           <Button
//             onClick={() => setShowAuthModal(true)}
//             className="bg-black text-white hover:bg-gray-800"
//           >
//             {tButtons("login")}
//           </Button>
//         </div>
//       ) : (
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             noValidate
//             className="flex flex-col gap-4 mt-5"
//           >
//             <ShippingForm
//               form={form}
//               isSubmitting={isLoading}
//               status={status}
//               data={saveOrderData || null}
//             />
//           </form>
//         </Form>
//       )}

//       <AuthModal
//         isOpen={showAuthModal}
//         onOpenChange={setShowAuthModal}
//         onAuthenticated={() => {
//           setIsAuthenticated(true);
//           setShowAuthModal(false);
//         }}
//       />
//     </>
//   );
// }
"use client";

import { defineStepper } from "@/components/ui/stepper";
import z from "zod";
import { formSchema } from "./schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ShippingForm from "./shipping-form";
import { useDispatch, useSelector } from "react-redux";
import {
  saveOrder,
  getCartProducts,
  resetStatus,
} from "@/store/slices/cart-slice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import AuthModal from "@/components/auth/auth-modal";
import PageWrapper from "@/components/page-wrapper";
import Success from "./success";
import Failed from "./failed";
import Loading from "@/components/loading";

export type CheckoutFormValues = z.infer<typeof formSchema>;

const defaultFormValues: CheckoutFormValues = {
  billing: {
    first_name: "",
    last_name: "",
    email: "",
    address1: "",
    city: "",
    phone: "",
    use_for_shipping: true,
  },
  shipping: {
    address1: "",
    city: "",
    phone: "",
  },
  payment: {
    method: "cashondelivery" as const,
  },
  shipping_method: "flatrate_flatrate" as const,
};

export default function Checkout({
  total,
  data,
}: {
  total: number;
  data: any;
}) {
  const router = useRouter();
  const t = useTranslations("cart");
  const tButtons = useTranslations("buttons");
  const dispatch = useDispatch();
  const [redirecting, setRedirecting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { Stepper } = defineStepper(
    { id: "shipping", title: t("shipping") },
    { id: "payment", title: t("payment") }
  );

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  const { watch, handleSubmit } = form;

  const { saveOrderData, isLoading, status } = useSelector(
    (state: any) => state.cart
  );

  const success = saveOrderData?.data?.data?.success;
  const redirectUrl = saveOrderData?.data?.data?.url;

  const { isAuthenticated: authStatus, user } = useSelector(
    (state: any) => state.auth
  );

  // Update authentication state
  useEffect(() => {
    setIsAuthenticated(authStatus && !!user);
  }, [authStatus, user]);

  // Handle form submission
  const onSubmit = async (values: CheckoutFormValues) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    const { use_for_shipping, ...billingWithoutFlag } = values.billing;

    const shippingData = use_for_shipping
      ? {
          address1: values.billing.address1,
          city: values.billing.city,
          phone: values.billing.phone,
        }
      : values.shipping;

    const checkoutPayload = {
      billing: billingWithoutFlag,
      shipping: shippingData,
      payment: values.payment,
      shipping_method: values.shipping_method,
    };

    await dispatch(saveOrder(checkoutPayload) as any);
    dispatch(resetStatus());
  };

  // Redirect immediately if URL exists
  const paymentMethod = watch("payment.method");
  useEffect(() => {
    dispatch(getCartProducts() as any);

    if (success && redirectUrl) {
      setRedirecting(true);
      router.push(redirectUrl);
    }
  }, [success, redirectUrl, router , paymentMethod , dispatch]);

  // Show Failed page if order failed
  if (saveOrderData?.success === false) {
    return (
      <PageWrapper>
        <Failed />
      </PageWrapper>
    );
  }

  // Show Success page if order succeeded and no redirect URL
  if (
    saveOrderData?.success &&
    (paymentMethod === "tabby" || paymentMethod === "cashondelivery")
  ) {
    router.push("/cart/checkout-status");
  }

  return (
    <>
      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-lg font-semibold mb-4">{t("login-required")}</h3>
          <p className="text-gray-600 mb-6">{t("please-login-to-checkout")}</p>
          <Button
            onClick={() => setShowAuthModal(true)}
            className="bg-black text-white hover:bg-gray-800"
          >
            {tButtons("login")}
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4 mt-5"
          >
            <ShippingForm
              form={form}
              isSubmitting={isLoading}
              status={status}
              data={saveOrderData || null}
            />
          </form>
        </Form>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={setShowAuthModal}
        onAuthenticated={() => {
          setIsAuthenticated(true);
          setShowAuthModal(false);
        }}
      />
    </>
  );
}
