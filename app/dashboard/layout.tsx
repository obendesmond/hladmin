import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import Header from "./components/header";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "17rem",
        } as React.CSSProperties
      }
      className="bg-primary-light"
    >
      <AppSidebar />
      <SidebarInset>
        <Header />
        <ScrollArea className="flex-1 p-4 bg-white">{children}</ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
