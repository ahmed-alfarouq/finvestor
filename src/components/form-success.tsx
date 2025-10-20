import { CheckCircle2Icon } from "lucide-react";

const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircle2Icon size={16} className="flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
