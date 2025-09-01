'use client';

import { useFormContext } from 'react-hook-form';
import { Checkbox } from './ui/checkbox';
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Label } from './ui/label';
import { CheckBoxOrRadioInterFace } from '@/types/types';

export default function LabelAndCheckbox({
  inputId,
  containerStyle,
  checboxStyle,
  fieldName,
  labelText,
  labelStyle,
  control,
}: CheckBoxOrRadioInterFace) {

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={`flex items-center ${containerStyle}`}>
          <Label htmlFor={inputId} className={`${labelStyle} text-sm md:text-base`}>
            {labelText}
          </Label>
          <FormControl>
            <Checkbox
              id={inputId}
              className={`border-deep-violet text-deep-violet bg-white ${checboxStyle}`}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage className="absolute right-1/2 -bottom-6 w-full translate-x-1/2 transform text-center text-xs text-nowrap" />
        </FormItem>
      )}
    />
  );
}
