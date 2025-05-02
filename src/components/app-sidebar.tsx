"use client";

import React from "react";
import useCurrentUser from "@/hooks/use-current-user";

import Image from "next/image";
import NavLink from "./nav-link";
import PlaidLink from "./ui/plaid-link";
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
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar side="left" {...props}>
      <SidebarHeader className="px-5 py-5">
        <Image src="/img/logo.webp" alt="logo" width={150} height={50} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 py-6 gap-4">
          <SidebarMenuItem>
            <NavLink
              to="/overview"
              active={pathname === "/overview"}
              text="Overview"
              beforeIcon={<AiOutlineWindows size={24} />}
              handleClick={toggleSidebar}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/balances"
              active={pathname === "/balances"}
              text="Balances"
              beforeIcon={<Wallet size={24} />}
              handleClick={toggleSidebar}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/transactions"
              active={pathname === "/transactions"}
              text="Transactions"
              beforeIcon={<ArrowLeftRight size={24} />}
              handleClick={toggleSidebar}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/bills"
              active={pathname === "/bills"}
              text="Bills"
              beforeIcon={<FaMoneyBills size={24} />}
              handleClick={toggleSidebar}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/expenses"
              active={pathname === "/expenses"}
              text="Expenses"
              beforeIcon={<BiMoneyWithdraw size={24} />}
              handleClick={toggleSidebar}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/goals"
              active={pathname === "/goals"}
              text="Goals"
              beforeIcon={<BiTargetLock size={24} />}
              handleClick={toggleSidebar}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/settings"
              active={pathname === "/settings"}
              text="Settings"
              beforeIcon={<CiSettings size={24} />}
              handleClick={toggleSidebar}
            />
          </SidebarMenuItem>
          {user && (
            <SidebarMenuItem>
              <PlaidLink
                user={user}
                icon="/icons/connect-bank.svg"
                variant="ghost"
                className="w-full justify-start text-white hover:text-white hover:bg-primary dark:hover:bg-primary-dark"
              />
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <NavUser
          name={user?.firstName || ""}
          email={user?.email || ""}
          avatar={user?.image || ""}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
