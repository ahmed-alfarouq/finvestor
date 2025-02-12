"use client";

import React, { useState } from "react";
import { ImCheckboxChecked } from "react-icons/im";

type props = {
  checked: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
  id: string;
};

const CheckBox = ({ checked, label, onChange, id }: props) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const toggleCheckbox = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleCheckbox();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isChecked}
        id={id}
        onChange={toggleCheckbox}
        onKeyDown={handleEnter}
        className="sr-only"
        aria-checked={isChecked}
      />

      <div
        role="checkbox"
        tabIndex={0}
        aria-checked={isChecked}
        aria-labelledby={`${id}-label`}
        className={`bg-white text-lg flex items-center justify-center rounded-sm focus:outline-none ${
          isChecked ? "text-primary" : "text-white w-[18px] h-[18px]"
        } transition-all cursor-pointer`}
        onClick={toggleCheckbox}
        onKeyDown={handleEnter}
      >
        {isChecked && <ImCheckboxChecked />}
      </div>

      {label && (
        <label
          id={`${id}-label`}
          htmlFor={id}
          className="text-primary-color dark:text-gray-200 cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
