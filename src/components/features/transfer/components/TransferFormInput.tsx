"use client";

import FormInput from "@/components/auth/FormInput";

import { TransferFormInputProps } from "@/types";

const TransferFormInput = ({
  name,
  title,
  label,
  type = "text",
  placeholder,
  control,
  disabled,
}: TransferFormInputProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-20 border-t last:border-t-0 border-gray-5 dark:border-gray-7 py-5 mt-3">
      <h3 className="text-base font-medium text-secondary-color dark:text-secondary-color-dark sm:w-[42%] md:w-[45%] lg:w-[47%]">
        {title}
      </h3>
      <FormInput
        name={name}
        label={label}
        type={type}
        placeholder={placeholder}
        control={control}
        disabled={disabled}
        className="sm:w-[40%] lg:w-1/2 xl:w-[250px]"
      />
    </div>
  );
};

export default TransferFormInput;
