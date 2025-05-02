"use client";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { MdCategory } from "react-icons/md";

const CategoryIcon = ({
  icon,
  categoryName,
  itemExpanded,
}: {
  icon?: string;
  categoryName: string;
  itemExpanded: boolean;
}) => {
  return (
    <div className="flex items-stretch gap-2">
      <div
        className={cn(
          "w-12 rounded-md flex items-center justify-center",
          itemExpanded
            ? "bg-gray-4 dark:bg-gray-7"
            : "bg-special-1 dark:bg-gray-7"
        )}
      >
        {icon ? (
          <Image src={icon} alt={categoryName} width={30} height={30} />
        ) : (
          <MdCategory
            className={cn(
              itemExpanded
                ? "text-secondary-color dark:text-gray-3"
                : "text-gray-2 dark:text-gray-6"
            )}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryIcon;
