"use client";

import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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

  return (
    <div className={`${containerClassName}`}>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
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
