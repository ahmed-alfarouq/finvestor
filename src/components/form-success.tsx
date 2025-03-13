import { CheckCircle2Icon } from "lucide-react";
import React from "react";

interface FormErrorProps {
  message?: string;
}

const FormSuccess = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircle2Icon size={16} />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
