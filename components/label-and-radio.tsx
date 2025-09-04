"use client";

import * as React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

type RadioOption = {
  value: string;
  label: string;
  customerTypeTrigger: () => void;
};

type LabelAndRadioProps<T extends Record<string, any>> = {
  inputName: string;
  options?: RadioOption[];
  labelText?: string;
  parentStyle?: string;
  labelStyle?: string;
  itemClassName?: string;
  inputId?: string;
  control: object;
  action?: () => void;
};

export default function LabelAndRadio<T extends Record<string, any>>({
  inputName,
  options,
  labelText,
  parentStyle = "",
  labelStyle = "",
  itemClassName = "",
  inputId,
  control,
  action,
}: LabelAndRadioProps<T>) {
  return (
    <FormField
      control={control}
      name={inputName}
      render={({ field }) => (
        <FormItem className={`${parentStyle} w-full`}>
          <FormControl className="w-full">
            <RadioGroup
              className="flex w-full justify-center items-end gap-3 flex-col"
              value={field.value ?? ""}
              onValueChange={(v) => field.onChange(v || undefined)}
            >
              {options?.map((opt) => {
                const id = `${String(name)}-${opt.value}`;
                return (
                  <div
                    key={opt.value}
                    className={`flex items-center gap-3 ${itemClassName} w-full ltr:justify-start rtl:justify-end`}
                  >
                    <RadioGroupItem
                      id={id}
                      value={opt.value}
                      className="peer order-2 cursor-pointer  ltr:order-1 rtl:order-2 "
                      onClick={opt?.action}
                    />
                    <Label
                      onClick={opt?.action}
                      htmlFor={id}
                      className={`${labelStyle} text-end text-nowrap cursor-pointer ltr:order-2 rtl:order-1`}
                    >
                      {opt.label}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
