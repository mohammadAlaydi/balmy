"use client";

import { InputInterFace } from "@/types/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export default function LabelAndInput({
  containerStyle,
  containerColSpan,
  labelColSpan,
  inputColSpan,
  inputStyle,
  inputPlaceholder,
  fieldName,
  inputType = "text",
  labelText,
  labelStyle,
  inputId,
  control,
  value,
}: InputInterFace) {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem
          className={`relative grid gap-3 ${containerStyle} ${containerColSpan}`}
        >
          {labelText && (
            <FormLabel
              className={` text-sm text-nowrap md:text-base ${labelStyle} ${labelColSpan}`}
            >
              {labelText}
            </FormLabel>
          )}
          <FormControl className={`${inputColSpan}`}>
            <Input
              id={inputId}
              type={inputType}
              placeholder={inputPlaceholder}
              className={inputStyle}
              {...field}
            />
          </FormControl>
          <FormMessage className="absolute right-1/2 -bottom-6 w-full translate-x-1/2 transform text-center text-xs text-nowrap" />
        </FormItem>
      )}
    />
  );
}
