"use client";

import React from "react";

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
import { removeFromCart } from "@/store/slices/cart-slice";

export default function DeleteProductComponent({
  productId,
}: {
  productId: number;
}) {
  const dispatch = useAppDispatch();

  return (
    <Dialog>
      <DialogTrigger>
        <MdDeleteSweep className="text-2xl cursor-pointer text-red-color" />
      </DialogTrigger>
      <DialogContent
        className="flex flex-col gap-8"
        showCloseButton={false}
        width="sm:max-w-sm"
      >
        <p className="text-start">هل انت متاكد من حذف هذا المنتج</p>
        <DialogFooter className="flex gap-3 justify-center ">
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={() => dispatch(removeFromCart({ productId }))}
          >
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
