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

interface CouponFormData {
  coupon: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function OrderSummary() {
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
      toast.error("Please enter a coupon code");
      return;
    }

    // Simulate coupon validation
    if (data.coupon.toUpperCase() === "SAVE20") {
      toast.success("Coupon applied successfully! 20% discount added.");
      form.reset();
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    // Add checkout logic here
  };

  const formatCurrency = (amount: number) => {
    return `EGP ${amount.toFixed(2)}`;
  };

  return (
    <div className="xl:col-span-3 col-span-9 p-6 rounded-lg border border-gray-200 h-fit flex flex-col gap-6 mx-auto bg-white shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      {/* Coupon Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <Input
            placeholder="Enter your coupon code"
            {...form.register("coupon", {
              required: "Coupon code is required",
            })}
          />
          <Button
            type="submit"
            className="absolute rtl:left-0 ltr:right-0 top-0 h-full px-4 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Apply
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
            {formatCurrency(subtotal)}
          </Badge>
          <Badge
            variant="outline"
            className="text-base bg-transparent text-gray-color border-gray-200"
          >
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </Badge>
        </div>
        {/* VAT */}
        <div className="flex justify-between items-center gap-5">
          <Badge
            variant="outline"
            className="text-base bg-transparent text-gray-color border-gray-200"
          >
            {formatCurrency(subtotal * 0.14)}
          </Badge>
          <Badge
            variant="outline"
            className="text-base bg-transparent text-gray-color border-gray-200"
          >
            VAT (14%)
          </Badge>
        </div>
        <hr className="border-gray-200" />
        {/* Total */}
        <div className="flex justify-between items-center gap-5">
          <Badge
            variant="outline"
            className="text-lg font-semibold bg-transparent text-gray-color border-gray-200"
          >
            {formatCurrency(total)}
          </Badge>
          <Badge
            variant="outline"
            className="text-lg font-semibold bg-transparent text-gray-color border-gray-200"
          >
            Total (Inclusive of VAT)
          </Badge>
        </div>
      </div>
      {/* Checkout Button */}
      <Dialog>
        <DialogTrigger>
          <Button className="w-full bg-black text-white hover:bg-gray-800 transition-colors py-3 text-base font-semibold">
            Proceed to Checkout
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Checkout />
        </DialogContent>
      </Dialog>

      {/* Additional Info */}
      <div className="text-xs text-gray-500 text-center">
        Free shipping on orders over EGP 1000
      </div>
    </div>
  );
}
