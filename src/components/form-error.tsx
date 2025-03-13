import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 flex items-center gap-x-2 text-sm text-destructive dark:text-destructive-dark">
      <AiFillExclamationCircle size={16} />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
