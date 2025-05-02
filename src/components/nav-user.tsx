"use client";

import Link from "next/link";
import { useState } from "react";
import { logout } from "@/actions/auth/logout";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

import { ShieldUser, EllipsisVertical, UserPen } from "lucide-react";
import { CgLogOut } from "react-icons/cg";
import getFirstLetters from "@/lib/getFirstLetters";

export function NavUser({
  name,
  email,
  avatar,
}: {
  name?: string;
  email?: string;
  avatar?: string;
}) {
  const { toggleSidebar, isMobile } = useSidebar();
  const [diableLogout, setDiableLogout] = useState(false);

  const handleLogout = () => {
    setDiableLogout(true);
    logout();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Button
          size="lg"
          className="w-full justify-start gap-2 mb-20 bg-special-3 text-base font-semibold"
          onClick={handleLogout}
          disabled={diableLogout}
        >
          <CgLogOut size={22} className=" rotate-180" />
          Logout
        </Button>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-primary hover:bg-primary hover:text-white data-[state=open]:text-white"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="rounded-lg bg-primary uppercase">
                  {getFirstLetters(name || "")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-dark">
                <span className="truncate font-semibold capitalize">
                  {name}
                </span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md bg-default-black text-white shadow-sm dark:shadow-white"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="rounded-lg uppercase bg-primary">
                    {getFirstLetters(name || "")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-dark">
                  <span className="truncate font-semibold capitalize">
                    {name}
                  </span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/settings/security"
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-3 text-sm outline-none transition-colors hover:text-white focus:bg-primary hover:bg-primary focus:text-white"
                  onClick={toggleSidebar}
                >
                  <UserPen />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/settings"
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-3 text-sm outline-none transition-colors hover:text-white focus:bg-primary hover:bg-primary focus:text-white"
                  onClick={toggleSidebar}
                >
                  <ShieldUser />
                  Security
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
