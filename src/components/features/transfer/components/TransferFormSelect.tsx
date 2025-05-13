"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TransferFormSelectProps } from "@/types";
import { CreditCard } from "lucide-react";

const TransferFormSelect = ({
  accounts,
  name,
  title,
  description,
  placeholder,
  control,
  disabled,
}: TransferFormSelectProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-20 border-t last:border-t-0 border-gray-5 dark:border-gray-7 py-5 mt-8">
      <div className="space-y-2 sm:w-[42%] md:w-[45%] lg:w-[47%]">
        <h3 className="text-base font-medium text-secondary-color dark:text-secondary-color-dark">
          {title}
        </h3>
        <p className="text-sm text-gray-2 dark:text-gray-5">{description}</p>
      </div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="sm:w-[40%] lg:w-1/2 xl:w-[250px]">
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl>
                <SelectTrigger
                  beforeIcon={<CreditCard className="size-[17px] text-primary dark:text-gray-5" />}
                  className="w-full bg-default dark:bg-default-dark text-base text-third-color dark:text-primary-color-dark placeholder:text-gray-7 shadow-sm dark:border-gray-3 focus:ring-0"
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-default dark:bg-default-dark">
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TransferFormSelect;
