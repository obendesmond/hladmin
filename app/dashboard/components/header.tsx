"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter((segment) => segment !== "");

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-white sticky top-0 z-50 shadow-sm">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {segments?.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const isLast = index === segments.length - 1;

            return (
              <BreadcrumbItem key={index}>
                <Link
                  href={isLast ? "" : href}
                  className={cn(
                    "uppercase",
                    isLast && "font-bold text-gray-800"
                  )}
                >
                  {segment}
                </Link>
                {!isLast && (
                  <Separator orientation="vertical" className="mx-2 h-4" />
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};

export default Header;
