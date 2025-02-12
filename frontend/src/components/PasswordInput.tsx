"use client";
import React, { useState } from "react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

type props<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegister<T>;
};

const PasswordInput = <T extends FieldValues>({
  label,
  name,
  placeholder,
  error,
  register,
}: props<T>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="flex flex-col space-y-2 w-full max-w-md">
      {label && (
        <label
          htmlFor={name}
          className="text-primary-color dark:text-gray-200 font-medium"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full p-3 border rounded-md text-gray-1 dark:text-white bg-transparent border-[#D0D5DD]  focus:border-third-color focus:outline-none ${
            error ? "border-red-500" : ""
          }`}
        />
        <button
          type="button"
          aria-label={isVisible ? "Hide password" : "Show password"}
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-1 dark:text-primary-color-dark"
        >
          {isVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};

export default PasswordInput;
