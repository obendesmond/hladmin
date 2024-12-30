"use client";

import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";

function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (user && !loading) {
    return null;
  }
  
  return (
    <div className={cn(`bg-primary-light h-screen w-full flex items-center justify-center px-4`)}>
        {children}
    </div>
  );
}

export default AuthLayout;
