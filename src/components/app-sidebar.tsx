"use client";

import React from "react";
import useCurrentUser from "@/hooks/use-current-user";

import Image from "next/image";
import NavLink from "./nav-link";
import { usePathname } from "next/navigation";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { ArrowLeftRight, Wallet } from "lucide-react";
import { AiOutlineWindows } from "react-icons/ai";
import { FaMoneyBills } from "react-icons/fa6";
import { BiMoneyWithdraw, BiTargetLock } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const user = useCurrentUser();
  const { toggleSidebar, isMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar side="left" {...props}>
      <SidebarHeader className="bg-default-black px-5 py-5">
        <Image src="/img/logo.webp" alt="logo" width={150} height={50} />
      </SidebarHeader>
      <SidebarContent className="bg-default-black">
        <SidebarMenu className="px-2 py-6 gap-4">
          <SidebarMenuItem>
            <NavLink
              to="/overview"
              active={pathname === "/overview"}
              text="Overview"
              beforeIcon={<AiOutlineWindows size={24} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/balances"
              active={pathname === "/balances"}
              text="Balances"
              beforeIcon={<Wallet size={24} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/transactions"
              active={pathname === "/transactions"}
              text="Transactions"
              beforeIcon={<ArrowLeftRight size={24} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/bills"
              active={pathname === "/bills"}
              text="Bills"
              beforeIcon={<FaMoneyBills size={24} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/expenses"
              active={pathname === "/expenses"}
              text="Expenses"
              beforeIcon={<BiMoneyWithdraw size={24} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/goals"
              active={pathname === "/goals"}
              text="Goals"
              beforeIcon={<BiTargetLock size={24} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/settings"
              active={pathname === "/settings"}
              text="Settings"
              beforeIcon={<CiSettings size={24} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="bg-default-black text-white">
        <NavUser
          name={user?.name || ""}
          email={user?.email || ""}
          avatar={user?.image || ""}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
