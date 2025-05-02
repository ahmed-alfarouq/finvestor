import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { GoDash } from "react-icons/go";
const IncreaseDecreaseIndicator = ({ percentage }: { percentage: number }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base font-medium text-gray-3 dark:text-gray-5">
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
