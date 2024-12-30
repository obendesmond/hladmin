import { useEffect } from "react";
import { useSandboxListStore } from "@/stores/sandbox-store";

function useSandboxList() {
  const { listSandbox, loading, sandboxCsequences } = useSandboxListStore();

  useEffect(() => {
    const fetchSandboxCSequences = async () => {
      await listSandbox();
    };
    fetchSandboxCSequences();
  }, []);

  return { sandboxCsequences, loading };
}

export default useSandboxList;
