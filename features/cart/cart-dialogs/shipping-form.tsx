import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import LabelAndInput from "@/components/label-and-input";
import LabelAndCheckbox from "@/components/label-and-checkbox";
import LabelAndRadio from "@/components/label-and-radio";
import { formSchema } from "../schemas";
import SectionTitle from "@/components/section-title";

export type CheckoutFormValues = z.infer<typeof formSchema>;

export type CheckoutFormProps = {
  defaultValues?: Partial<CheckoutFormValues>;
  onSubmit?: (values: CheckoutFormValues) => void;
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
    method: "creditcard" as const,
  },
  shipping_method: "flatrate_flatrate" as const,
  same_as_billing: true,
};

export default function CheckoutForm({
  defaultValues,
  onSubmit,
  submitLabel = "طلب الشحن",
  isSubmitting = false,
}: CheckoutFormProps) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { ...defaultFormValues, ...defaultValues },
  });

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

  const handleSubmit = (values: CheckoutFormValues) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      // Fallback: log if no handler is passed
      console.log("Checkout submitted", values);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="w-full xl:max-w-3xl mx-auto max-h-[80vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <CardContent>
              {/* Billing Information */}
              <div className="my-6">
                <SectionTitle title="بيانات الفواتير"/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <LabelAndInput
                    control={form.control}
                    fieldName="billing.first_name"
                    labelText="الاسم الاول"
                    inputPlaceholder="John"
                    inputType="text"
                    inputId="billing-first-name"
                  />
                  <LabelAndInput
                    control={form.control}
                    fieldName="billing.last_name"
                    labelText="الاسم الاخير"
                    inputPlaceholder="Doe"
                    inputType="text"
                    inputId="billing-last-name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <LabelAndInput
                    control={form.control}
                    fieldName="billing.email"
                    labelText="البريد الالكتروني"
                    inputPlaceholder="john.doe@example.com"
                    inputType="email"
                    inputId="billing-email"
                  />
                  <LabelAndInput
                    control={form.control}
                    fieldName="billing.address1"
                    labelText="العنوان"
                    inputPlaceholder="1234 Maple Street"
                    inputType="text"
                    inputId="billing-address"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <LabelAndInput
                    control={form.control}
                    fieldName="billing.city"
                    labelText="المدينة"
                    inputPlaceholder="Los Angeles"
                    inputType="text"
                    inputId="billing-city"
                  />
                  <LabelAndInput
                    control={form.control}
                    fieldName="billing.phone"
                    labelText="الهاتف"
                    inputPlaceholder="+1-555-987-6543"
                    inputType="tel"
                    inputId="billing-phone"
                  />
                </div>
              </div>

              {/* Same as Billing Checkbox */}
              <div className="my-6">
                <LabelAndCheckbox
                  control={form.control}
                  fieldName="same_as_billing"
                  labelText="العنوان مثل الفواتير"
                  inputId="same-as-billing"
                  containerStyle="flex-row-reverse justify-end gap-3"
                />
              </div>

              {/* Shipping Information */}
              {!sameAsBilling && (
                <div className="my-6">
                  <SectionTitle title="بيانات الشحن"/>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <LabelAndInput
                      control={form.control}
                      fieldName="shipping.address1"
                      labelText="العنوان"
                      inputPlaceholder="1234 Maple Street"
                      inputType="text"
                      inputId="shipping-address"
                    />
                    <LabelAndInput
                      control={form.control}
                      fieldName="shipping.city"
                      labelText="المدينة"
                      inputPlaceholder="Los Angeles"
                      inputType="text"
                      inputId="shipping-city"
                    />
                  </div>
                  <div className="mt-4">
                    <LabelAndInput
                      control={form.control}  
                      fieldName="shipping.phone"
                      labelText="الهاتف"
                      inputPlaceholder="+1-555-987-6543"
                      inputType="tel"
                      inputId="shipping-phone"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
                {/* Shipping Method */}
                <div className="space-y-4">
                  <SectionTitle title="طريقة الشحن"/>
                  <LabelAndRadio
                    control={form.control}
                    inputName="shipping_method"
                    labelText="اختر طريقة الشحن"
                    options={[
                      {
                        value: "flatrate_flatrate",
                        label: "الشحن العادي",
                        customerTypeTrigger: () => {},
                      },
                      {
                        value: "freeshipping_freeshipping",
                        label: "الشحن المجاني",
                        customerTypeTrigger: () => {},
                      },
                      {
                        value: "tablerate_bestway",
                        label: "الشحن السريع",
                        customerTypeTrigger: () => {},
                      },
                    ]}
                    itemClassName="justify-end"
                  />
                </div>
                {/* Payment Method */}
                <div className="space-y-4">
                  <SectionTitle title="طريقة الدفع"/>
                  <LabelAndRadio
                    control={form.control}
                    inputName="payment.method"
                    labelText="اختر طريقة الدفع"
                    options={[
                      {
                        value: "cashondelivery",
                        label: "الدفع عند الاستلام",
                        customerTypeTrigger: () => {},
                      },
                      {
                        value: "creditcard",
                        label: "بطاقة ائتمان",
                        customerTypeTrigger: () => {},
                      },
                      {
                        value: "paypal",
                        label: "بايبال",
                        customerTypeTrigger: () => {},
                      },
                    ]}
                    itemClassName="justify-end"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-3 pt-6">
              <Button
                type="submit"
                disabled={!form.formState.isValid || isSubmitting}
                className="w-full sm:w-auto min-w-32"
                size="lg"
              >
                {isSubmitting ? "يتم المعالجة..." : submitLabel}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
}

/**
 * Helper to map form values back to your order payload shape
 * Useful before hitting your API.
 */
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
