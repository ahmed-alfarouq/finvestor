import { auth } from "@/auth";

import AppSidebar from "@/components/app-sidebar";
import DashboardHeader from "@/components/features/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <DashboardHeader name={session?.user.name ?? "User"} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
