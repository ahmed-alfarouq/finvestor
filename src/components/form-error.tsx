import { AiFillExclamationCircle } from "react-icons/ai";

const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 flex items-center gap-x-2 text-sm text-destructive dark:text-destructive-dark">
      <AiFillExclamationCircle size={16} className="flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
