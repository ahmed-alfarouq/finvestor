"use client";
import { useSession } from "next-auth/react";

import AppSidebar from "@/components/app-sidebar";
import DashboardHeader from "@/components/features/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import UpdateSessionProviderWrapper from "@/components/auth/UpdateSessionProviderWrapper";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { update } = useSession();

  return (
    <UpdateSessionProviderWrapper update={update}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </UpdateSessionProviderWrapper>
  );
};

export default DashboardLayout;
