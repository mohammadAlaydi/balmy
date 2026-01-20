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
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { BeatLoader } from "react-spinners";
import { MdDeleteSweep } from "react-icons/md";

export default function DeleteProductComponent({
  action,
  setIsOpen,
  isOpen,
  text,
  deleteMessage,
}: {
  action: () => void;
  setIsOpen: any;
  isOpen: boolean;
  text?: string;
  deleteMessage?: string;
}) {
  const t = useTranslations("buttons");
  const isLoading = useSelector((state: any) => state.cart.isLoading);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center gap-2">
        <MdDeleteSweep className="text-2xl cursor-pointer text-red-500" />
        {text && <p className="font-[550]">{text}</p>}
      </DialogTrigger>
      <DialogContent
        className="flex flex-col gap-5"
        showCloseButton={false}
        width="sm:max-w-sm"
      >
        <div className="flex justify-center">
          <MdDeleteSweep className="text-center mx-auto text-3xl text-red-500" />
        </div>
        <p className="text-start">
          {t(deleteMessage ? deleteMessage : "delete-confirmation")}
        </p>
        <DialogFooter className="flex gap-3 justify-center ">
          <DialogClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>
          <Button type="submit" onClick={action}>
            {isLoading ? <BeatLoader size={3} /> : t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
