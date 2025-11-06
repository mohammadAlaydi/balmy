"use client";

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
    method: "cashondelivery",
  },
  shipping_method: "flatrate_flatrate" as const,
};

export default function Checkout() {
  const router = useRouter();
  const t = useTranslations("cart");
  const tButtons = useTranslations("buttons");

  const { saveOrderData, status } = useSelector((state: any) => state.cart);

  const success = saveOrderData?.data?.data?.success;
  const redirectUrl = saveOrderData?.data?.data?.url;


  const dispatch = useDispatch();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  const { watch, handleSubmit, formState } = form;

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

  useEffect(() => {
    dispatch(getCartProducts() as any);
  }, [dispatch]);
  // ✅ التحكم في التنقل بعد نجاح الطلب
  useEffect(() => {
    if (!saveOrderData) return;

    const orderId = saveOrderData?.data?.data?.order?.id;
    const paymentMethod = watch("payment.method");

    if (saveOrderData?.success && orderId) {
      if (paymentMethod === "cashondelivery" || paymentMethod === "tabby") {
        // انتقل لصفحة الحالة
        router.push(`/cart/checkout-status/${orderId}`);
        // اعمل reset بعد التنقل فقط
        dispatch(resetStatus());
      } else {
        // لو فيه URL خارجي (مثلاً للدفع الإلكتروني)
        router.push(redirectUrl);

        dispatch(resetStatus());

      }
    }
  }, [saveOrderData, watch, router, redirectUrl, dispatch]);

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
              isSubmitting={formState?.isSubmitting || false}
              status={status}
              data={saveOrderData || null}
              watch={watch}
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
