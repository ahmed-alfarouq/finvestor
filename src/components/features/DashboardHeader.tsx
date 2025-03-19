"use client";
import React from "react";
import useCurrentUser from "@/hooks/use-current-user";
import { useIsMobile } from "@/hooks/use-mobile";

import { SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import DarkModeToggle from "@/components/dark-mode-toggle";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const DashboardHeader = () => {
  const user = useCurrentUser();
  const isMobile = useIsMobile();
  return (
    <header className="flex items-center justify-between shrink-0 h-16 border-b px-4">
      <div className="flex items-center sm:gap-2 px-1  text-default-black dark:text-white">
        <SidebarTrigger className="-ml-1" />
        <SidebarSeparator orientation="vertical" />
        {!isMobile && (
          <h2 className="font-semibold capitalize">hello, {user?.name}</h2>
        )}
        <MdKeyboardDoubleArrowRight size={24} />
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <DarkModeToggle />
    </header>
  );
};

export default DashboardHeader;
