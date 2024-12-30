import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSandboxRunStore } from "@/stores/sandbox-store";
import { Separator } from "@/components/ui/separator";
import { Play } from "lucide-react";

export default function SandboxNavbar() {
  const { selectedSequence, run, loading, status } = useSandboxRunStore();
  const sequencePath = selectedSequence?.split("/");
  const started = status === "start";
  const completed = status === "complete";

  const handleRun = async () => {
    await run();
  };

  return (
    <div className="sticky top-0 z-10 grid grid-cols-8 gap-2 items-center justify-between px-4 py-2 border-b bg-gray-100">
      {started || completed && (
        <div
          className={cn(
            "absolute top-0 left-1/2 transform -translate-x-1/2 text-[10px] text-white px-1 py-[1px] rounded-b-xs",
            started ? "bg-red-600" : completed ? "bg-green-600" : ""
          )}
        >
          {started ? "running" : "completed"}
        </div>
      )}
      <div className="col-span-7 flex gap-2 overflow-x-auto no-scrollbar hide-scroll">
        {sequencePath?.map((part, index) => (
          <span
            key={index}
            className="flex items-center gap-4 text-gray-700 font-medium"
          >
            {part}
            {index !== sequencePath.length - 1 && (
              <Separator orientation="vertical" className="h-4 bg-primary" />
            )}
          </span>
        ))}
      </div>
      <div className="col-span-1 flex justify-end">
        <Button
          size="icon"
          disabled={!selectedSequence}
          className={cn("rounded-full px-4 py-2 transition cursor-pointer")}
          onClick={handleRun}
          loading={loading}
        >
          <Play />
        </Button>
      </div>
    </div>
  );
}
