"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormInputProps } from "@/types";

const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  control,
  disabled = false,
  className,
}: FormInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              disabled={disabled}
              type={type}
              placeholder={placeholder}
              {...field}
              autoComplete="off"
              className="bg-default dark:bg-default-dark"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
