import { cn } from "@/lib/utils";
import { CircleCheck, Clock3 } from "lucide-react";

const TransactionStatus = ({ pending }: { pending: boolean }) => {
  return (
    <div
      className={cn(
        "flex-center truncate w-fit gap-1 rounded-md py-1 px-2 mx-auto",
        pending ? "bg-[#e5e7f4]" : "bg-[#e8eee7] dark:bg-[#00a400]"
      )}
    >
      {pending ? (
        <Clock3 className="size-4 text-[#2316a8]" />
      ) : (
        <CircleCheck className="size-4 text-[#376c31] dark:text-white" />
      )}
      <p
        className={cn(
          "text-[12px] font-medium",
          pending ? "text-[#2316a8]" : "text-[#376c31] dark:text-white"
        )}
      >
        {pending ? "Processing" : "Success"}
      </p>
    </div>
  );
};

export default TransactionStatus;
