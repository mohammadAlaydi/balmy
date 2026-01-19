"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "@/store/slices/cart-slice";
import { useEffect, useState } from "react";
import Checkout from "./checkout";

interface CouponFormData {
  coupon: string;
}

export default function OrderSummary({ data }: { data: any }) {
  const t = useTranslations("cart");
  const dispatch = useDispatch();
  const { saveOrderData, status, isLoading } = useSelector(
    (state: any) => state.cart
  );
  const [open, setOpen] = useState(false);
  const form = useForm<CouponFormData>({
    defaultValues: {
      coupon: "",
    },
  });

  // Calculate totals without side effects
  const calculateTotals = () => {
    const items = data?.data?.items || [];

    if (!items.length) {
      return { subtotal: 0, tax: 0, total: 0, itemCount: 0 };
    }

    const subtotal = items.reduce((total: number, item: any) => {
      const price = Number(
        item?.product?.price?.value ||
        item?.product?.price?.final_price ||
        item?.product?.price?.base_price ||
        item?.product?.price ||
        0
      );
      const quantity = Number(item?.quantity || 0);
      return total + price * quantity;
    }, 0);

    const tax = Number(data?.data?.base_tax_total || 0);
    const total = subtotal + tax;

    return {
      subtotal,
      tax,
      total,
      items,
    };
  };

  const { subtotal, tax, total, items } = calculateTotals();

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

  useEffect(() => {
    if (status == "success") {
      toast.success(t("order-success"));
      setOpen(false);
    } else if (status == "failed") {
      toast.error(t("order-failed"));
    }
  }, [status, t]);
  // Show empty cart message if no items
  if (!data?.data?.items?.length) {
    return (
      <div className="col-span-12 lg:col-span-5 xl:col-span-4 p-6 rounded-lg border border-gray-200 h-fit flex flex-col gap-6 bg-white shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 capitalize">
          {t("order-summary")}
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">{t("cart-empty")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12 lg:col-span-5 xl:col-span-4 p-6 rounded-lg border border-gray-200 h-fit flex flex-col gap-6 bg-white shadow-sm">
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
            className="absolute rtl:left-0 ltr:right-0 top-0 h-full px-4 bg-black text-white hover:bg-gray-800 transition-colors transition-opacity"
            disabled={form.watch("coupon") === ""}
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
            className="text-sm bg-transparent text-gray-color border-gray-200 border-none capitalize"
          >
            {items.length === 1 ? t("item") : t("items")}
          </Badge>
          <Badge
            variant="outline"
            className="text-sm bg-transparent text-gray-color border-gray-200 bg-gray-50"
          >
            {subtotal.toFixed(2)} <i className="icon-rial"></i>
          </Badge>
        </div>
        {/* TAX */}
        <div className="flex justify-between items-center gap-5">
          <Badge
            className="text-sm bg-transparent text-gray-color border-gray-200 border-none capitalize"
          >
            {t("taxes")}
          </Badge>
          <Badge
            variant="outline"
            className="text-sm bg-transparent text-gray-color border-gray-200 bg-gray-50"
          >
            {tax.toFixed(2)} <i className="icon-rial"></i>
          </Badge>
        </div>
        <hr className="border-gray-200" />
        {/* Total */}
        <div className="flex justify-between items-center gap-5">
          <Badge
            variant="outline"
            className="text-sm font-bold bg-transparent text-gray-color border-gray-200 border-none capitalize"
          >
            {t("total-inclusive-vat")}
          </Badge>
          <Badge
            variant="outline"
            className="text-sm font-bold bg-transparent text-gray-color border-gray-200 bg-gray-50"
          >
            {total.toFixed(2)} <i className="icon-rial"></i>
          </Badge>
        </div>
      </div>
      {/* Checkout Button */}
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
        }}
      >
        <DialogTitle className="hidden"></DialogTitle>
        <DialogTrigger
          onClick={() => {
            dispatch(resetStatus());
          }}
          className="w-full bg-black text-white hover:bg-gray-800 transition-colors py-2 cursor-pointer text-base font-semibold rounded-md"
        >
          {t("proceed-to-checkout")}
        </DialogTrigger>
        <DialogContent>
          <Checkout />
        </DialogContent>
      </Dialog>
    </div>
  );
}
