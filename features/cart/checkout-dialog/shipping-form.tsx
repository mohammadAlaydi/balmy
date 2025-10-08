"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import LabelAndInput from "@/components/label-and-input";
import LabelAndCheckbox from "@/components/label-and-checkbox";
import LabelAndRadio from "@/components/label-and-radio";
import SectionTitle from "@/components/section-title";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { PuffLoader } from "react-spinners";
import Success from "./success";
import Failed from "./failed";
import { useEffect } from "react";

export default function ShippingForm({
  isSubmitting,
  form,
  status,
  data,
}: {
  submitLabel?: string;
  isSubmitting?: boolean;
  form: any;
  status: string | null;
  data: any;
}) {
  const t = useTranslations("cart");
  const tButtons = useTranslations("buttons");

  useEffect(() => {
    status = null;
  }, [status]);
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card
        className={`w-full xl:max-w-3xl mx-auto max-h-[80vh] overflow-y-auto shadow-none ${
          status == "success" || status == "failed" ? "hidden" : ""
        }`}
      >
        <CardContent>
          {/* Billing Information */}
          <div className="my-6">
            <SectionTitle title={t("billing-information")} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <LabelAndInput
                control={form.control}
                fieldName="billing.first_name"
                labelText={t("first-name")}
                inputPlaceholder={t("placeholder-first-name")}
                inputType="text"
                inputId="billing-first-name"
              />
              <LabelAndInput
                control={form.control}
                fieldName="billing.last_name"
                labelText={t("last-name")}
                inputPlaceholder={t("placeholder-last-name")}
                inputType="text"
                inputId="billing-last-name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <LabelAndInput
                control={form.control}
                fieldName="billing.email"
                labelText={t("email")}
                inputPlaceholder={t("placeholder-email")}
                inputType="email"
                inputId="billing-email"
              />
              <LabelAndInput
                control={form.control}
                fieldName="billing.address1"
                labelText={t("address")}
                inputPlaceholder={t("placeholder-address")}
                inputType="text"
                inputId="billing-address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <LabelAndInput
                control={form.control}
                fieldName="billing.city"
                labelText={t("city")}
                inputPlaceholder={t("placeholder-city")}
                inputType="text"
                inputId="billing-city"
              />
              <LabelAndInput
                control={form.control}
                fieldName="billing.phone"
                labelText={t("phone")}
                inputPlaceholder={t("placeholder-phone")}
                inputType="tel"
                inputId="billing-phone"
              />
            </div>
          </div>
          {/* Same as Billing Checkbox */}
          <div className="my-6">
            <LabelAndCheckbox
              control={form.control}
              fieldName="billing.use_for_shipping"
              labelText={t("same-as-billing")}
              inputId="same-as-billing"
              containerStyle="flex-row-reverse justify-end gap-3"
            />
          </div>
          {/* Shipping Information */}
          {!form.watch("billing.use_for_shipping") && (
            <div className="my-6">
              <SectionTitle title={t("shipping-information")} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <LabelAndInput
                  control={form.control}
                  fieldName="shipping.address1"
                  labelText={t("address")}
                  inputPlaceholder={t("placeholder-address")}
                  inputType="text"
                  inputId="shipping-address"
                />
                <LabelAndInput
                  control={form.control}
                  fieldName="shipping.city"
                  labelText={t("city")}
                  inputPlaceholder={t("placeholder-city")}
                  inputType="text"
                  inputId="shipping-city"
                />
              </div>
              <div className="mt-4">
                <LabelAndInput
                  control={form.control}
                  fieldName="shipping.phone"
                  labelText={t("phone")}
                  inputPlaceholder={t("placeholder-phone")}
                  inputType="tel"
                  inputId="shipping-phone"
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            {/* Shipping Method */}
            <div className="space-y-4">
              <SectionTitle title={t("shipping-method")} />
              <LabelAndRadio
                control={form.control}
                inputName="shipping_method"
                labelText={t("choose-shipping-method")}
                options={[
                  {
                    value: "flatrate_flatrate",
                    label: t("normal-shipping"),
                    customerTypeTrigger: () => {},
                  },
                  {
                    value: "freeshipping_freeshipping",
                    label: t("free-shipping"),
                    customerTypeTrigger: () => {},
                  },
                  {
                    value: "tablerate_bestway",
                    label: t("express-shipping"),
                    customerTypeTrigger: () => {},
                  },
                ]}
                itemClassName="justify-end"
              />
            </div>
            {/* Payment Method */}
            <div className="space-y-4 ">
              <SectionTitle title={t("payment-method")} />
              <LabelAndRadio
                control={form.control}
                inputName="payment.method"
                labelText={t("choose-payment-method")}
                options={[
                  {
                    value: "cashondelivery",
                    label: t("cash-on-delivery"),
                    customerTypeTrigger: () => {},
                  },
                  {
                    value: "creditcard",
                    label: t("credit-card"),
                    customerTypeTrigger: () => {},
                  },
                  {
                    value: "paypal",
                    label: t("paypal"),
                    customerTypeTrigger: () => {},
                  },
                ]}
                itemClassName="justify-end"
              />
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-fit mt-3">
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <PuffLoader color="#ffffff" size={20} />
                <span>{tButtons("submitting")}</span>
              </div>
            ) : (
              tButtons("submit")
            )}
          </Button>
        </CardContent>
      </Card>
      {status == "success" && <Success data={data} />}
      {status === "failed" && <Failed />}
    </motion.div>
  );
}
