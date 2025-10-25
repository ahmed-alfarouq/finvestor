import { GoDash } from "react-icons/go";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

import { cn } from "@/lib/utils";

const IncreaseDecreaseIndicator = ({
  percentage,
  textClassName,
}: {
  percentage: number;
  textClassName?: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "text-base font-medium text-gray-3 dark:text-gray-5",
          textClassName
        )}
      >
        {percentage}%
      </span>
      {percentage > 0 ? (
        <MdArrowUpward width={30} height={30} className="text-special-red" />
      ) : percentage < 0 ? (
        <MdArrowDownward
          width={30}
          height={30}
          className="text-special-green"
        />
      ) : (
        <GoDash width={30} height={30} className="text-gray-3" />
      )}
    </div>
  );
};

export default IncreaseDecreaseIndicator;
