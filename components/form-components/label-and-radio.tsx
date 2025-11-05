"use client";

import * as React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type RadioOption = {
  value: string;
  label: React.ReactNode;
  action?: () => void; // used for setting state like paymentMethod
};

type LabelAndRadioProps<T extends Record<string, any>> = {
  inputName?: string;
  options?: RadioOption[];
  labelText?: string;
  parentStyle?: string;
  labelStyle?: string;
  itemClassName?: string;
  inputId?: string;
  control: any;
};

export default function LabelAndRadio<T extends Record<string, any>>({
  inputName,
  options,
  parentStyle = "",
  labelStyle = "",
  itemClassName = "",
  control,
}: LabelAndRadioProps<T>) {
  return (
    <FormField
      control={control}
      name={inputName}
      render={({ field }) => (
        <FormItem className={`${parentStyle} w-full`}>
          <FormControl className="w-full">
            <RadioGroup
              className="flex w-full justify-center items-end gap-5 flex-col"
              value={field.value ?? ""}
              onValueChange={(v) => field.onChange(v || undefined)}
            >
              {options?.map((opt) => {
                const id = `${inputName}-${opt.value}`;
                return (
                  <div
                    key={opt.value}
                    className={`flex items-center gap-3 ${itemClassName} w-full ltr:justify-start rtl:justify-end`}
                  >
                    <RadioGroupItem
                      id={id}
                      value={opt.value}
                      className="peer order-2 cursor-pointer ltr:order-1 rtl:order-2"
                      onClick={opt.action}
                      disabled={opt?.disable}
                    />
                    <Label
                      onClick={opt.action}
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
