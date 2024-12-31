"use client";

import ESRDialog from "./components/esr-dialog";
import CDRDialog from "./components/cdr-dialog";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EntityDetails() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-[100vh] m-10" />}>
      <div className="flex items-center gap-4 flex-wrap w-full h-full">
        <ESRDialog />
        <CDRDialog />
      </div>
    </Suspense>
  );
}
