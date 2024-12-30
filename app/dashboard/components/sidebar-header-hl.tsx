import { ApiEndPoints } from "@/api/api-end-points";
import { MainLogo } from "@/components/brand/Logo";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";


function SidebarHeaderHL() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <a href="#">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <MainLogo width={35} height={35}  />
            </div>
            <div className="flex flex-col gap-0.5 leading-none text-white">
              <span className="font-semibold">Hungerlink Foundation</span>
              {ApiEndPoints.version && (
                <span className="">v{ApiEndPoints.version}.0.0</span>
              )}
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default SidebarHeaderHL;
