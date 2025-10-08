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
  resetStatus,
  getCartProducts,
} from "@/store/slices/cart-slice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function Checkout() {
  const router = useRouter();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultFormValues,
  });
  const dispatch = useDispatch();
  const { saveOrderData, isLoading, status } = useSelector(
    (state: any) => state.cart
  );

  const onSubmit = async (values: CheckoutFormValues) => {
    await dispatch(saveOrder(values) as any);
    dispatch(getCartProducts() as any);
    router.refresh();
    setTimeout(() => {
      router.push("/home");
    }, 2000);
  };
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
        <ShippingForm
          form={form}
          isSubmitting={isLoading}
          status={status}
          data={saveOrderData || null}
        />
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
