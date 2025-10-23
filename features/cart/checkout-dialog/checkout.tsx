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
} from "@/store/slices/cart-slice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import AuthModal from "@/components/auth/auth-modal";

// Stepper will be defined inside the component to allow translated titles

export type CheckoutFormValues = z.infer<typeof formSchema>;

export type CheckoutFormProps = {
  defaultValues?: Partial<CheckoutFormValues>;
  submitLabel?: string;
  isSubmitting?: boolean;
};

// Default values with proper typing
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
    method: "moyasar" as const,
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
  const dispatch = useDispatch();
  const {
    saveOrderData,
    isLoading,
    status,
    data: cartData,
  } = useSelector((state: any) => state.cart);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const onSubmit = async (values: CheckoutFormValues) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
  
    // Remove `use_for_shipping` from billing
    const { use_for_shipping, ...billingWithoutFlag } = values.billing;
  
    // Determine shipping info based on flag
    const shippingData = use_for_shipping
      ? {
          address1: values.billing.address1,
          city: values.billing.city,
          phone: values.billing.phone,
        }
      : values.shipping;
  
    // Create cleaned payload
    const checkoutPayload = {
      billing: billingWithoutFlag,
      shipping: shippingData,
      payment: values.payment,
      shipping_method: values.shipping_method,
    };
  
    try {
      console.log("Checkout payload being sent:", checkoutPayload);
      dispatch(saveOrder(checkoutPayload) as any);
    } catch (error) {
      console.error("Error during checkout:", error);
      dispatch(saveOrder(checkoutPayload) as any);
    }
  };
  

  // Navigate to checkout status page once we have a definitive status
  useEffect(() => {
    if (status === "success" || status === "failed") {
      if (status === "success") {
        // Refresh cart data after successful checkout
        dispatch(getCartProducts() as any);
      }
      router.push("/cart/checkout-status");
    }
  }, [status, dispatch, router]);
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
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4 mt-5 "
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
export const toCheckoutPayload = (
  values: CheckoutFormValues,
) => {
  return {
    billing: values.billing,
    shipping: values.shipping,
    payment: values.payment,
    shipping_method: values.shipping_method,
  };
};

// Keep the old function for backward compatibility
export const toShippingPayload = (values: CheckoutFormValues) => ({
  shipping: values.shipping,
});
