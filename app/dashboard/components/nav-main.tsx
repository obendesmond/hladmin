"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();
  const isActive = (url: string) => {
    if (url === "") return pathname === "/dashboard";
    return pathname.includes(url);
  };

  return (
    <SidebarGroup className="pt-10 hide-scroll">
      <SidebarMenu className="gap-4">
        {items.map((item) => (
          <Link key={item.title} href={`/dashboard/${item.url}`}>
            <SidebarMenuItem
              className={cn(
                "hover:bg-white hover:text-black rounded-xs text-white transition-colors ease-in-out duration-200",
                isActive(item.url) && "bg-white text-black"
              )}
            >
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon className="scale-125" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
