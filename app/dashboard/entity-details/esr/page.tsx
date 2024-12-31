import { Suspense } from "react";
import ESRMain from "./components/esr-main";
import { Skeleton } from "@/components/ui/skeleton";

export default function ESR() {
  return (
    <Suspense fallback={<Skeleton className="w-full h-[100vh] m-10" />}>
      <ESRMain />
    </Suspense>
  );
}
