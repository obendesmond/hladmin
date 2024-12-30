"use client";

import React, { useState } from "react";
import SandboxSidebar from "./components/sandbox-sidebar";
import SandboxNavbar from "./components/sandbox-navbar";
import { MoveHorizontal } from "lucide-react";

export default function SandboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarWidth, setSidebarWidth] = useState(283);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(
        263,
        Math.min(700, startWidth + (e.clientX - startX))
      );
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex h-[calc(100vh-90px)] border rounded-sm ">
      <div
        className="h-full rounded-l-sm bg-gray-50 relative overflow-y-auto overflow-x-hidden p-4 select-none hide-scroll"
        style={{ width: sidebarWidth }}
      >
        <SandboxSidebar />
        <div
          className="absolute top-0 right-0 h-full w-5 border-x bg-gray-100 cursor-ew-resize flex items-center justify-center"
          onMouseDown={handleMouseDown}
        >
          <MoveHorizontal className="scale-75 opacity-40" />
        </div>
      </div>
      <div className="flex-1 h-full flex flex-col overflow-y-auto">
        <SandboxNavbar />
        {children}
      </div>
    </div>
  );
}
