"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { ImCheckboxChecked } from "react-icons/im";

type checkboxProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError | undefined;
  className?: string;
};

const Checkbox = <T extends FieldValues>({
  register,
  label,
  name,
  error,
  className,
}: checkboxProps<T>) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleCheckbox = () => setIsChecked((prev) => !prev);

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleCheckbox();
    }
  };

  return (
    <div className="flex items-center gap-2 my-3">
      <input
        type="checkbox"
        checked={isChecked}
        id={name}
        {...register(name)}
        onChange={toggleCheckbox}
        onKeyDown={handleEnter}
        className="sr-only"
        aria-checked={isChecked}
      />

      <div
        tabIndex={0}
        aria-hidden={true}
        className={cn(
          isChecked ? "text-primary" : "text-white w-[18px] h-[18px] border",
          "bg-white text-lg flex items-center justify-center rounded-sm focus:outline-none transition-all cursor-pointer",
          className
        )}
        onClick={toggleCheckbox}
        onKeyDown={handleEnter}
      >
        {isChecked && <ImCheckboxChecked />}
      </div>

      {label && (
        <label
          id={`${name}-label`}
          htmlFor={name}
          className="text-primary-color dark:text-gray-200 font-light cursor-pointer"
        >
          {label}
        </label>
      )}
      {error && <p role="alert" className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default Checkbox;
