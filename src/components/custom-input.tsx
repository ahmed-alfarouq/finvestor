"use client";
import { cn } from "@/lib/utils";
import React from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type props<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  type?: "text" | "email" | "number" | "date";
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  register: UseFormRegister<T>;
  className?: string;
};

const CustomInput = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder = "",
  error,
  required = false,
  register,
  className,
}: props<T>) => {
  return (
    <div className={cn("w-full flex flex-col space-y-2", className)}>
      {label && (
        <label
          htmlFor={name}
          className="text-primary-color dark:text-primary-color-dark font-medium"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={cn(
          "w-full p-2 border rounded-md text-gray-1 dark:text-white bg-transparent border-[#D0D5DD]  focus:border-third-color focus:outline-none",
          error && "border-red-500"
        )}
      />
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
