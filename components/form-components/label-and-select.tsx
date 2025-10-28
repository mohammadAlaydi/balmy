"use client";

import { useTranslations } from "next-intl";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectInterFace } from "@/types/types";

export default function LabelAndSelect({
  selectOptions,
  containerStyle,
  containerColSpan,
  labelColSpan,
  selectColSpan,
  selectStyle,
  fieldName,
  labelText,
  labelStyle,
  control,
}: SelectInterFace) {
  const t = useTranslations("buttons");

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
          <FormControl className={`${selectColSpan} w-full`}>
            <div>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={` w-full ${selectStyle}`}>
                  <SelectValue placeholder={t("select-option")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectOptions.length > 0 ? (
                      selectOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className={` ${selectStyle}`}
                        >
                          {option.label}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem
                        disabled
                        value=""
                        className={`text-center opacity-50 ${selectStyle}`}
                      >
                        {t("no-options")}
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          <FormMessage className="text-orange-color absolute right-1/2 -bottom-6 translate-x-1/2 transform text-center text-xs text-nowrap" />
        </FormItem>
      )}
    />
  );
}
