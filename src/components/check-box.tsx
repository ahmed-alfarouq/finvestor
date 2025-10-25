"use client";
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ImCheckboxChecked } from "react-icons/im";
import { cn } from "@/lib/utils";

type CheckboxProps<T extends FieldValues> = {
  registerName: Path<T>;
  label: string;
  value: string;
  register: UseFormRegister<T>;
  checked: boolean;
  className?: string;
};

const Checkbox = <T extends FieldValues>({
  register,
  registerName,
  value,
  label,
  checked,
  className,
}: CheckboxProps<T>) => {
  return (
    <label
      htmlFor={value}
      className={cn("flex items-center gap-2 cursor-pointer group", className)}
    >
      <input
        type="checkbox"
        id={value}
        value={value}
        {...register(registerName)}
        className="peer sr-only"
        defaultChecked={checked}
      />

      <div className="p-0 w-[18px] h-[18px] bg-white text-white border border-default-black peer-checked:text-primary peer-checked:border-primary rounded-sm transition-all">
        <ImCheckboxChecked className="w-full h-full" />
      </div>

      <span className="text-default-black dark:text-gray-7 font-medium whitespace-nowrap">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
