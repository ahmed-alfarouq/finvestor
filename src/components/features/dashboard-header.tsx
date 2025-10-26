import { SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import DarkModeToggle from "@/components/dark-mode-toggle";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { formatDateTime } from "@/lib/utils";

const DashboardHeader = ({ name }: { name: string }) => {
  return (
    <header className="w-full px-4 md:px-8 flex items-center justify-between shrink-0 h-20 border-b border-gray-4 dark:border-gray-5">
      <div className="flex items-center sm:gap-2 px-1 text-default-black dark:text-white">
        <SidebarTrigger className="-ml-1" />
        <SidebarSeparator orientation="vertical" />

        <h2 className="text-lg sm:text-2xl font-semibold capitalize">
          hello, {name}
        </h2>

        <MdKeyboardDoubleArrowRight
          size={24}
          className="hidden md:block sm:ml-3 text-gray-2 dark:text-gray-4"
        />
        <span className="hidden md:block text-sm text-gray-2 dark:text-gray-4">
          {formatDateTime(new Date()).dateOnly}
        </span>
      </div>
      <DarkModeToggle />
    </header>
  );
};

export default DashboardHeader;
