"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FiEye, FiEyeOff } from "react-icons/fi";

type passwordInputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  placeholder?: string;
  error: FieldError | undefined;
  register: UseFormRegister<T>;
  className?: string;
};

const PasswordInput = <T extends FieldValues>({
  label,
  name,
  placeholder,
  error,
  register,
  className,
}: passwordInputProps<T>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={name}
          className="text-primary-color dark:text-gray-200 font-medium"
        >
          {label}
          <span className="text-red-500">*</span>
        </label>
      )}
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          autoComplete="off"
          placeholder={placeholder}
          {...register(name)}
          className={cn(
            "w-full p-2 border rounded-md text-gray-1 dark:text-white bg-transparent border-[#D0D5DD]  focus:border-third-color focus:outline-none appearance-none [&::-ms-reveal]:hidden [&::-ms-clear]:hidden",
            error && "border-red-500"
          )}
        />
        <button
          type="button"
          aria-label={isVisible ? "Hide password" : "Show password"}
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-3 top-1/2 rtl:left-3 rtl:right-auto transform -translate-y-1/2 text-gray-1 dark:text-primary-color-dark"
        >
          {isVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
