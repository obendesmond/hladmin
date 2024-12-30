"use client"

import * as React from "react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import SidebarHeaderHL from "./sidebar-header-hl"

import { 
  LayoutDashboard, 
  BookOpen, 
  MonitorCog,
  Layers,
  DatabaseBackup,
  Codesandbox
} from "lucide-react";

export const navMain = [
  {
    title: "Dashboard",
    url: "",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Operations",
    url: "operations",
    icon: MonitorCog,
  },
  {
    title: "Heavy Batch",
    url: "heavy-batch",
    icon: Layers,
  },
  {
    title: "RLS",
    url: "rls",
    icon: DatabaseBackup,
  },
  {
    title: "Entity Details",
    url: "entity-details",
    icon: BookOpen,
  },
  {
    title: "Sandbox",
    url: "sandbox",
    icon: Codesandbox,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarHeaderHL />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter >
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
