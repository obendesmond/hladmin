import { useEffect, useRef } from "react";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";

function useUser() {
  const { user, getAuthUser, loading, logout } = useUserStore();
  const router = useRouter();
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && !hasFetched.current) {
        hasFetched.current = true;
        const success = await getAuthUser();
        if (!success) {
          router.push("/");
        }
      }
    };
    fetchUser();
  }, [user, getAuthUser]);

  return { user, loading, logout };
}

export default useUser;
