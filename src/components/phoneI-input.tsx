"use client";

import { useState } from "react";
import {
  Controller,
  FieldValues,
  Path,
  UseFormRegister,
  Control,
  FieldError,
} from "react-hook-form";
import Select from "react-select";
import countryData from "@/countryData";

type props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  control: Control<T>;
};

const PhoneInput = <T extends FieldValues>({
  label,
  name,
  register,
  control,
  error,
}: props<T>) => {
  const [selectedCountry, setSelectedCountry] = useState(countryData[0]);

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <div
        className={`flex border border-[#D0D5DD] rounded-md bg-transparent focus:border-third-color focus:outline-none  ${
          error ? "border-red-500" : ""
        }`}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={countryData}
              formatOptionLabel={(e) => (
                <div className="flex items-center space-x-1">
                  <span className="text-lg">{e.flag}</span>
                  <span>{e.code}</span>
                </div>
              )}
              getOptionValue={(e) => e.code}
              value={selectedCountry}
              onChange={(selected) => {
                setSelectedCountry(selected ?? countryData[0]);
                field.onChange(selected?.code ?? countryData[0].code);
              }}
              className="w-32"
              classNames={{
                control: () => "bg-transparent border-none shadow-none",
                option: ({ isSelected }) =>
                  `px-3 py-2 ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-transparent text-gray-500"
                  } hover:bg-primary`,
                menu: () => "bg-white rounded-lg shadow-md",
              }}
            />
          )}
        />

        <input
          {...register(name)}
          type="tel"
          placeholder="Enter phone number"
          className={`w-full text-gray-1 dark:text-white`}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default PhoneInput;
