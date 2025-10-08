"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { MdDeleteSweep } from "react-icons/md";
import { useAppDispatch } from "@/store/hooks";
import { getCartProducts, removeFromCart } from "@/store/slices/cart-slice";
import LoadingSpinner from "./ui/loading-spinner";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export default function DeleteProductComponent({
  productId,
}: {
  productId: number | string;
}) {

  const t = useTranslations("buttons");
  const tToast = useTranslations("toast");
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: any) => state.cart.isLoading);
  const status = useSelector((state: any) => state.cart.status);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (productId: number | string) => {
    try {
      await dispatch(removeFromCart({ productId: Number(productId) })).unwrap();
      await dispatch(getCartProducts());
      toast.success(tToast("product-deleted"));
      if (status === "success") {
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <MdDeleteSweep className="text-2xl cursor-pointer text-red-500" />
      </DialogTrigger>
      <DialogContent
        className="flex flex-col gap-8"
        showCloseButton={false}
        width="sm:max-w-sm"
      >
        <p className="text-start">{t("delete-confirmation")}</p>
        <DialogFooter className="flex gap-3 justify-center ">
          <DialogClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>
          <Button type="submit" onClick={() => handleDelete(productId)}>
            {isLoading ? <LoadingSpinner size="sm" /> : t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
