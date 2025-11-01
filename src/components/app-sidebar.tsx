"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

import NavLink from "./nav-link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import { CgLogOut } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { AiOutlineWindows } from "react-icons/ai";
import { ArrowLeftRight, Wallet } from "lucide-react";
import { BiMoneyWithdraw, BiTargetLock } from "react-icons/bi";

import { logout } from "@/actions/auth/logout";

import useCurrentUser from "@/hooks/use-current-user";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const user = useCurrentUser();

  const { toggleSidebar } = useSidebar();
  const [logoutDisabled, setLogoutDisabled] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    setLogoutDisabled(true);
    logout(user?.id || "");
  };

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
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="pb-20">
        <Button
          size="lg"
          className="justify-start gap-2 bg-special-3 font-semibold"
          onClick={handleLogout}
          disabled={logoutDisabled}
        >
          <CgLogOut size={22} className="rotate-180" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
