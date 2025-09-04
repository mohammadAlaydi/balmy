"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { defineStepper } from "@/components/ui/stepper";
import ShippingForm from "./shipping-form";
import { useTranslations } from "next-intl";
import z from "zod";
import { formSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher } from "@/app/helpers/fetchers";
import { Form } from "@/components/ui/form";

const { Stepper } = defineStepper(
  { id: "shipping", title: "Shipping" },
  { id: "payment", title: "Payment" }
);

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
  same_as_billing: true,
};
export default function Checkout() {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });
  const API_KEY = process.env.NEXT_PUBLIC_API_URL;
  const [options, setOptions] = React.useState<RequestInit>({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage?.getItem("token")}`,
    },
    body: JSON.stringify(defaultFormValues),
  });

  const { data, loading, error, refetch, status } = useFetcher(
    `${API_KEY}/v1/customer/checkout/save-order`,
    options
  );
  const sameAsBilling = form.watch("same_as_billing");
  // Auto-fill shipping when "same as billing" is checked
  React.useEffect(() => {
    if (sameAsBilling) {
      const billingValues = form.getValues("billing");
      form.setValue("shipping.address1", billingValues.address1);
      form.setValue("shipping.city", billingValues.city);
      form.setValue("shipping.phone", billingValues.phone);
    }
  }, [sameAsBilling, form]);
  const onSubmit = (values: CheckoutFormValues) => {
    console.log(values);
    setOptions({
      ...options,
      body: JSON.stringify(values),
    });
  };
  useEffect(() => {
    if (options.body !== JSON.stringify(defaultFormValues)) {
      refetch();
    }
  }, [options]);
  return (
    // <div className="w-full xl:w-2/3 mx-auto">
    //   {/* <Stepper.Provider className="space-y-4 my-5">
    //     {(params) => (
    //       <>
    //         <Stepper.Navigation>
    //           <Stepper.Step
    //             of="shipping"
    //             onClick={() => params.methods.goTo("shipping")}
    //           >
    //             <Stepper.Title>{t("shipping")}</Stepper.Title>
    //           </Stepper.Step>

    //           <Stepper.Step
    //             of="payment"
    //             onClick={() => params.methods.goTo("payment")}
    //           >
    //             <Stepper.Title>{t("payment")}</Stepper.Title>
    //           </Stepper.Step>
    //         </Stepper.Navigation>

    //         {params.methods.switch({
    //           shipping: () => (
    //             <Stepper.Panel>
    //               <ShippingForm />
    //             </Stepper.Panel>
    //           ),
    //           payment: () => (
    //             <Stepper.Panel>
    //               <div className="p-4 border rounded-md">
    //                 {t("payment-options")}
    //               </div>
    //             </Stepper.Panel>
    //           ),
    //         })}

    //         <Stepper.Controls className="pt-2">
    //           <Button variant="secondary" onClick={() => params.methods.prev()}>
    //             {t("back")}
    //           </Button>
    //           <Button onClick={() => params.methods.next()}>{t("next")}</Button>
    //         </Stepper.Controls>
    //       </>
    //     )}
    //   </Stepper.Provider> */}
    // </div>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4 mt-5 "
      >
        <ShippingForm form={form} isSubmitting={loading} status={status} data={data || null}   />
      </form>
    </Form>
  );
}
export const toCheckoutPayload = (values: CheckoutFormValues) => ({
  billing: values.billing,
  shipping: values.shipping,
  payment: values.payment,
  shipping_method: values.shipping_method,
});

// Keep the old function for backward compatibility
export const toShippingPayload = (values: CheckoutFormValues) => ({
  shipping: values.shipping,
});
