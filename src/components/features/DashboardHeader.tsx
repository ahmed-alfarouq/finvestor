"use client";
import React from "react";
import useCurrentUser from "@/hooks/use-current-user";
import { useIsMobile } from "@/hooks/use-mobile";

import { SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import DarkModeToggle from "@/components/dark-mode-toggle";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { cn, formatDateTime } from "@/lib/utils";

const DashboardHeader = () => {
  const { user } = useCurrentUser();
  const isMobile = useIsMobile();
  return (
    <header
      className={cn(
        "flex items-center justify-between shrink-0 h-20 border-b border-gray-4 dark:border-gray-5",
        isMobile ? "container mx-auto" : "px-8"
      )}
    >
      <div className="flex items-center sm:gap-2 px-1 text-default-black dark:text-white">
        <SidebarTrigger className="-ml-1" />
        <SidebarSeparator orientation="vertical" />

        <h2 className="text-lg sm:text-2xl font-semibold capitalize">
          hello, {user?.firstName}
        </h2>

        {!isMobile && (
          <>
            <MdKeyboardDoubleArrowRight
              size={24}
              className="sm:ml-3 text-gray-2 dark:text-gray-4"
            />
            <span className="text-sm text-gray-2 dark:text-gray-4">
              {formatDateTime(new Date()).dateOnly}
            </span>
          </>
        )}
      </div>
      <DarkModeToggle />
    </header>
  );
};

export default DashboardHeader;
