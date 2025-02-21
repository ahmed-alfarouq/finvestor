"use client";

import React from "react";
import Image from "next/image";
import NavLink from "./nav-link";
import { ArrowLeftRight, Wallet } from "lucide-react";
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

import { AiOutlineWindows } from "react-icons/ai";
import { FaMoneyBills } from "react-icons/fa6";
import { BiMoneyWithdraw, BiTargetLock } from "react-icons/bi";

const data = {
  user: {
    name: "Ahmed Al-Farouq",
    email: "ahmed.omar.alfarouq@gmail.com",
    avatar: "/img/avatar.jpeg",
  },
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
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
              beforeIcon={<AiOutlineWindows size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/balances"
              active={pathname === "/balances"}
              text="Balances"
              beforeIcon={<Wallet size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/transactions"
              active={pathname === "/transactions"}
              text="Transactions"
              beforeIcon={<ArrowLeftRight size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/bills"
              active={pathname === "/bills"}
              text="Bills"
              beforeIcon={<FaMoneyBills size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/expenses"
              active={pathname === "/expenses"}
              text="Expenses"
              beforeIcon={<BiMoneyWithdraw size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/goals"
              active={pathname === "/goals"}
              text="Goals"
              beforeIcon={<BiTargetLock size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="bg-default-black text-white">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
