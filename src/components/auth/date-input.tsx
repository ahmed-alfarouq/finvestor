import React from "react";

import { cn } from "@/lib/utils";
import { Controller } from "react-hook-form";

import { FormControl, FormItem, FormLabel } from "../ui/form";
import DatePicker from "../ui/date-picker";

import { DateInputProps } from "@/types";

const DateInput = ({
  name,
  label,
  control,
  error,
  disabled = false,
  endMonth,
  dateFormat="PPP",
}: DateInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={cn(
              error && "text-destructive dark:text-destructive-dark"
            )}
          >
            {label}
          </FormLabel>
          <FormControl>
            <DatePicker
              disabled={disabled}
              selectedDate={field.value}
              onDateChange={field.onChange}
              endMonth={endMonth}
              dateFormat={dateFormat}
            />
          </FormControl>
          {error && (
            <p className="text-[0.8rem] font-medium text-destructive dark:text-destructive-dark">
              {error.message === "Required"
                ? "Date of birth is required!"
                : error.message}
            </p>
          )}
        </FormItem>
      )}
    />
  );
};

export default DateInput;
