"use client";

import React from "react";
import { ArrowLeftRight, Wallet } from "lucide-react";
import { usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import { NavUser } from "@/components/nav-user";
import NavLink from "./NavLink";
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
    avatar: "/logo.jpeg",
  },
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const t = useTranslations("SideNavbar");
  const { toggleSidebar, isMobile } = useSidebar();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <Sidebar side={locale === "ar" ? "right" : "left"} {...props}>
      <SidebarHeader className="bg-default-black px-5 py-5">
        <Image src="/logo.webp" alt="logo" width={150} height={50} />
      </SidebarHeader>
      <SidebarContent className="bg-default-black">
        <SidebarMenu className="px-2 py-6 gap-4">
          <SidebarMenuItem>
            <NavLink
              to="/"
              active={pathname === "/"}
              text={t("overview")}
              beforeIcon={<AiOutlineWindows size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/balances"
              active={pathname === "/balances"}
              text={t("balances")}
              beforeIcon={<Wallet size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/transactions"
              active={pathname === "/transactions"}
              text={t("transactions")}
              beforeIcon={<ArrowLeftRight size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/bills"
              active={pathname === "/bills"}
              text={t("bills")}
              beforeIcon={<FaMoneyBills size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/expenses"
              active={pathname === "/expenses"}
              text={t("expenses")}
              beforeIcon={<BiMoneyWithdraw size={20} />}
              handleClick={isMobile ? toggleSidebar : () => {}}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <NavLink
              to="/goals"
              active={pathname === "/goals"}
              text={t("goals")}
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
