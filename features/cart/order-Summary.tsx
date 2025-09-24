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
import Checkout from "./checkout-dialog/checkout";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "@/store/slices/cart-slice";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const t = useTranslations("cart");
  const dispatch = useDispatch();
  const { status } = useSelector((state: any) => state.cart);

  const form = useForm<CouponFormData>({
    defaultValues: {
      coupon: "",
    },
  });



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
  const handleTriggerClick = (e: React.MouseEvent) => {
    if (!localStorage.getItem("accessToken")) {
      e.preventDefault();
      router.push("/login");
    }
  };
  return (
    <div className="col-span-12 lg:col-span-5 xl:col-span-4  p-6 rounded-lg border border-gray-200 h-fit flex flex-col gap-6 bg-white shadow-sm">
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
            className="text-sm  bg-transparent text-gray-color border-gray-200"
          >
            {Number(data?.data?.sub_total)?.toFixed(2) || 0} ر.س
          </Badge>
          <Badge
            variant="outline"
            className="text-sm  bg-transparent text-gray-color border-gray-200"
          >
            {data?.data?.items?.length}{" "}
            {data?.data?.items?.length === 1 ? t("item") : t("items")})
          </Badge>
        </div>
        {/* TAX */}
        <div className="flex justify-between items-center gap-5">
          <Badge
            variant="outline"
            className="text-sm  bg-transparent text-gray-color border-gray-200"
          >
            {Number(data?.data?.base_tax_total)?.toFixed(2)} ر.س
          </Badge>
          <Badge
            variant="outline"
            className="text-sm  bg-transparent text-gray-color border-gray-200"
          >
            {t("taxes")}
          </Badge>
        </div>
        <hr className="border-gray-200" />
        {/* Total */}
        <div className="flex justify-between items-center gap-5">
          <Badge
            variant="outline"
            className="text-sm  font-semibold bg-transparent text-gray-color border-gray-200"
          >
            {Number(data?.data?.grand_total)?.toFixed(2)} ر.س
          </Badge>
          <Badge
            variant="outline"
            className="text-sm font-semibold bg-transparent text-gray-color border-gray-200"
          >
            {t("total-inclusive-vat")}
          </Badge>
        </div>
      </div>
      {/* Checkout Button */}
      <Dialog onOpenChange={(open) => {
        console.log("🔄 Dialog onOpenChange:", open);
        // Only reset status when dialog is closed AND status is not success
        if (!open && status !== "success") {
          console.log("🔄 Dialog closed, resetting status");
          dispatch(resetStatus());
        } else if (!open && status === "success") {
          console.log("🔄 Dialog closed but keeping success status");
        }
      }}>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogTrigger
          className="w-full bg-black text-white hover:bg-gray-800 transition-colors py-2 cursor-pointer text-base font-semibold rounded-md"
          onClick={handleTriggerClick}
        >
          {t("proceed-to-checkout")}
        </DialogTrigger>
        <DialogContent>
          <Checkout />
        </DialogContent>
      </Dialog>
      {/* Additional Info */}
      <div className="text-sm  text-gray-500 text-center">
        {t("free-shipping-over")}
      </div>
    </div>
  );
}
