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
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { PuffLoader } from "react-spinners";

export default function DeleteProductComponent({
  action,
  setIsOpen,
  isOpen,
  text,
}: {
  action: () => void;
  setIsOpen: any;
  isOpen: boolean;
  text?: string;
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
        className="flex flex-col gap-8"
        showCloseButton={false}
        width="sm:max-w-sm"
      >
        <p className="text-start">{t("delete-confirmation")}</p>
        <DialogFooter className="flex gap-3 justify-center ">
          <DialogClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>
          <Button type="submit" onClick={action}>
            {isLoading ? <PuffLoader size={30} /> : t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
