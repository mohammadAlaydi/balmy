"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import LabelAndInput from "@/components/form-components/label-and-input";
import LabelAndRadio from "@/components/form-components/label-and-radio";
import SectionTitle from "@/components/section-title";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { FaShippingFast, FaAmazonPay, FaCreditCard } from "react-icons/fa";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetStatus } from "@/store/slices/cart-slice";

interface ShippingFormProps {
  submitLabel?: string;
  isSubmitting?: boolean;
  form: any;
  status: string | null;
  data: any;
  watch: any;
}

export default function ShippingForm({
  isSubmitting,
  form,
  submitLabel,
  watch,
}: ShippingFormProps) {
  const dispatch = useDispatch();
  const t = useTranslations("cart");
  const tButtons = useTranslations("buttons");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  useEffect(() => {
    dispatch(resetStatus());
  }, []);
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card
        className={`w-full xl:max-w-3xl mx-auto max-h-[80vh] overflow-y-auto shadow-none`}
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
          <div className="my-6 flex items-center gap-2">
            <input
              type="checkbox"
              name="billing.use_for_shipping"
              checked={form.watch("billing.use_for_shipping")}
              onChange={(e) =>
                form.setValue("billing.use_for_shipping", e.target.checked)
              }
              id="same-as-billing"
              className="mr-2 accent-primary"
            />
            <Label htmlFor="same-as-billing" className="text-sm font-medium">
              {t("same-as-billing")}
            </Label>
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

          {/* Shipping & Payment Methods */}
          <div className="flex flex-col space-y-6">
            {/* Shipping Method */}
            <Accordion type="single" collapsible>
              <AccordionItem value="shipping-method">
                <AccordionTrigger className="border border-gray-200 px-3">
                  <div className="flex items-center gap-2">
                    <FaShippingFast size={22} className="text-primary" />
                    <SectionTitle
                      title={t("shipping-method")}
                      titleStyle="font-semibold lg:text-lg"
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border border-gray-200 p-3 mt-3 rounded-md">
                  <LabelAndRadio
                    control={form.control}
                    inputName="shipping_method"
                    labelText={t("choose-shipping-method")}
                    options={[
                      {
                        value: "flatrate_flatrate",
                        label: t("normal-shipping"),
                      },
                      {
                        value: "freeshipping_freeshipping",
                        label: t("free-shipping"),
                        disable: true,
                      },
                      {
                        value: "tablerate_bestway",
                        label: t("express-shipping"),
                        disable: true,
                      },
                    ]}
                    itemClassName="justify-end"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Payment Method */}
            <Accordion type="single" collapsible>
              <AccordionItem value="payment-way">
                <AccordionTrigger className="border border-gray-200 px-3">
                  <div className="flex items-center gap-2">
                    <FaAmazonPay size={24} className="text-primary" />
                    <SectionTitle
                      title={t("payment-method")}
                      titleStyle="font-semibold lg:text-lg"
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border border-gray-200 p-3 mt-3 rounded-md">
                  <div className="flex flex-col gap-3">
                    {/* Cash on Delivery */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        defaultChecked={true}
                        value="cashondelivery"
                        checked={paymentMethod === "cashondelivery"}
                        onChange={() => setPaymentMethod("cashondelivery")}
                        className="w-4 h-4 text-black focus:ring-black border-black accent-black"
                      />
                      <span className="text-sm md:text-base">{t("cash-on-delivery")}</span>
                    </label>

                    {/* Online Payment */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                        className="w-4 h-4 text-black focus:ring-black border-black accent-black"
                      />
                      <span className="text-sm md:text-base">{t("credit-card")}</span>
                    </label>
                  </div>

                </AccordionContent>

              </AccordionItem>
            </Accordion>

            {/* Online Payment Methods (if credit card selected) */}
            {paymentMethod === "online" && (
              <Accordion type="single" collapsible>
                <AccordionItem value="online-payment-methods">
                  <AccordionTrigger className="border border-gray-200 px-3">
                    <div className="flex items-center gap-2">
                      <FaCreditCard size={24} className="text-primary" />
                      <SectionTitle
                        title={t("online-payment-methods")}
                        titleStyle="font-semibold lg:text-lg"
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border border-gray-200 p-3 mt-3 rounded-md">
                    <LabelAndRadio
                      control={form.control}
                      inputName="payment.method"
                      labelText={t("choose-online-payment")}
                      options={[
                        {
                          value: "moyasar",
                          label: (
                            <Image
                              src="/assets/images/moyassar.svg"
                              alt="Moyassar"
                              width={90}
                              height={90}
                            />
                          ),
                        },
                        {
                          value: "tabby",
                          label: (
                            <Image
                              src="/assets/images/tabby.svg"
                              alt="Tabby"
                              width={80}
                              height={50}
                              className="object-contain"
                            />
                          ),
                        },
                      ]}
                      itemClassName="justify-end"
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-fit mt-6"
            formNoValidate
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <BeatLoader color="#ffffff" size={3} />
                <span>{tButtons("submitting")}</span>
              </div>
            ) : (
              submitLabel || tButtons("submit")
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
