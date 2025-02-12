"use client";

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";

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
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { toggleSidebar, isMobile } = useSidebar();
  const t = useTranslations("SideNavbar");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-primary hover:bg-primary hover:text-white data-[state=open]:text-white"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-primary">
                  AF
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-dark">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md bg-default-black text-white border-gray-3"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">AF</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-dark">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="/account"
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:text-white focus:bg-primary hover:bg-primary focus:text-white"
                  onClick={toggleSidebar}
                >
                  <BadgeCheck />
                  {t("account")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/notifications"
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:text-white focus:bg-primary hover:bg-primary focus:text-white"
                  onClick={toggleSidebar}
                >
                  <Bell />
                  {t("notifications")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="/logout"
                className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:text-white focus:bg-primary hover:bg-primary focus:text-white"
                onClick={toggleSidebar}
              >
                <LogOut />
                {t("logout")}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
