"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Checkout from "./cart-dialogs/checkout";
import { useTranslations } from "next-intl";

interface CouponFormData {
  coupon: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function OrderSummary({ data }: { data: any }) {
  const t = useTranslations("cart");
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "نعال جلدي أسود", price: 1000, quantity: 1 },
    { id: 2, name: "حذاء رياضي أبيض", price: 2500, quantity: 1 },
    { id: 3, name: "حقيبة جلدية بنية", price: 1800, quantity: 1 },
  ]);

  const form = useForm<CouponFormData>({
    defaultValues: {
      coupon: "",
    },
  });

  // Calculate totals
  const { subtotal, total, itemCount } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const vat = subtotal * 0.14; // 14% VAT
    const total = subtotal + vat;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal, total, itemCount };
  }, [cartItems]);

  const onSubmit = (data: CouponFormData) => {
    if (!data.coupon.trim()) {
              toast.error(t("please-enter-coupon-code"));
      return;
    }

    // Simulate coupon validation
    if (data.coupon.toUpperCase() === "SAVE20") {
              toast.success(t("coupon-applied-success"));
      form.reset();
    } else {
              toast.error(t("invalid-coupon-code"));
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
              toast.error(t("cart-empty"));
      return;
    }
    // Add checkout logic here
  };

  return (
    <div className="xl:col-span-3 col-span-9 p-6 rounded-lg border border-gray-200 h-fit flex flex-col gap-6 mx-auto bg-white shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">{t("order-summary")}</h2>
      {/* Coupon Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <Input
            placeholder={t("enter-coupon-code")}
            {...form.register("coupon", {
                              required: t("coupon-code-required"),
            })}
          />
          <Button
            type="submit"
            className="absolute rtl:left-0 ltr:right-0 top-0 h-full px-4 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            {t("apply")}
          </Button>
        </form>
      </Form>
      {/* Order Details */}
      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <Badge
            variant="outline"
            className="text-base bg-transparent text-gray-color border-gray-200"
          >
            {Number(data?.data?.sub_total)?.toFixed(2) || 0} ر.س
          </Badge>
          <Badge
            variant="outline"
            className="text-base bg-transparent text-gray-color border-gray-200"
          >
            {t("subtotal")} ({data?.data?.items?.length}{" "}
            {data?.data?.items?.length === 1 ? t("item") : t("items")})
          </Badge>
        </div>
        {/* TAX */}
        <div className="flex justify-between items-center gap-5">
          <Badge
            variant="outline"
            className="text-base bg-transparent text-gray-color border-gray-200"
          >
            {Number(data?.data?.base_tax_total)?.toFixed(2)} ر.س
          </Badge>
          <Badge
            variant="outline"
            className="text-base bg-transparent text-gray-color border-gray-200"
          >
            {t("taxes")}
          </Badge>
        </div>
        <hr className="border-gray-200" />
        {/* Total */}
        <div className="flex justify-between items-center gap-5">
          <Badge
            variant="outline"
            className="text-lg font-semibold bg-transparent text-gray-color border-gray-200"
          >
            {Number(data?.data?.grand_total)?.toFixed(2)} ر.س
          </Badge>
          <Badge
            variant="outline"
            className="text-lg font-semibold bg-transparent text-gray-color border-gray-200"
          >
            {t("total-inclusive-vat")}
          </Badge>
        </div>
      </div>
      {/* Checkout Button */}
      <Dialog>
        <DialogTrigger>
          <Button className="w-full bg-black text-white hover:bg-gray-800 transition-colors py-3 text-base font-semibold">
            {t("proceed-to-checkout")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Checkout />
        </DialogContent>
      </Dialog>

      {/* Additional Info */}
      <div className="text-xs text-gray-500 text-center">
        {t("free-shipping-over")}
      </div>
    </div>
  );
}
