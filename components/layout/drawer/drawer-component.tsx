"use client";

import React, { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

interface DrawerComponentProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  containerClassName?: string;
}

export default function DrawerComponent({
  children,
  trigger,
  containerClassName,
}: DrawerComponentProps) {
  
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState("right");
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  useEffect(() => {
    if (currentLocale === "ar") {
      setDirection("right");
    } else {
      setDirection("left");
    }
  }, [currentLocale]);

  return (
    <div className={`${containerClassName}`}>
      <Drawer open={open} onOpenChange={setOpen} direction={direction}>
        <DrawerTitle className="hidden"></DrawerTitle>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <div className="relative h-full">
            <div className="px-4 py-6 pt-16 h-full">{children}</div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4  h-8 w-8 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
