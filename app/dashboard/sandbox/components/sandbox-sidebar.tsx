import { useState, useEffect } from "react";
import { FileText, ChevronDown, ChevronRight } from "lucide-react";
import useSandboxList from "@/hooks/use-sandbox-list";
import { FileItem, FolderItem } from "@/types/sandbox";
import { useSandboxRunStore } from "@/stores/sandbox-store";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function SandboxSidebar() {
  const { sandboxCsequences, loading } = useSandboxList();
  const { handleSelectSequence, selectedSequence, status } =
    useSandboxRunStore();
  const [openFolders, setOpenFolders] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && sandboxCsequences.length > 0) {
      const firstFolder = sandboxCsequences.find(
        (item) => item.type === "folder"
      );
      if (firstFolder) {
        // open first folder path
        setOpenFolders([`/${firstFolder.name}`]);
      }
    }
  }, [loading, sandboxCsequences]);

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) =>
      prev.includes(folderName)
        ? prev.filter((name) => name !== folderName)
        : [...prev, folderName]
    );
  };

  const renderFolderContents = (
    items: (FileItem | FolderItem)[],
    parentPath: string
  ) => {
    return items.map((item) => {
      if (item.type === "folder") {
        const fullPath = `${parentPath}/${item.name}`;
        return (
          <div key={fullPath} className="mb-4 ">
            <div
              className="flex items-center justify-between cursor-pointer text-gray-700 font-medium mb-2"
              onClick={() => toggleFolder(fullPath)}
            >
              <div
                className={cn(
                  "flex items-center",
                  selectedSequence?.includes(fullPath) ? "text-primary" : ""
                )}
              >
                {openFolders.includes(fullPath) ? (
                  <ChevronDown className="mr-2" />
                ) : (
                  <ChevronRight className="mr-2" />
                )}
                {item.name}
              </div>
            </div>
            {openFolders.includes(fullPath) && (
              <div className="ml-4">
                {renderFolderContents(item.items, fullPath)}
              </div>
            )}
          </div>
        );
      } else if (item.type === "file") {
        return (
          <div
            key={item.name}
            className={cn(
              'flex justify-between gap-2 items-center cursor-pointer mb-2 px-2 py-1 rounded-xs', 
              status === "start"
                ? "pointer-events-none"
                : selectedSequence === `${parentPath}/${item.name}`
                ? "bg-primary text-white"
                : "hover:text-primary"
            )}
            onClick={() => handleSelectSequence(`${parentPath}/${item.name}`)}
          >
            <span className="flex items-center">
              <FileText className="mr-2 scale-75" /> {item.name}
            </span>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      {loading &&
        [1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex flex-col gap-2 mb-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%] self-end" />
            <Skeleton className="h-4 w-[80%] self-end" />
          </div>
        ))}
      {!loading && renderFolderContents(sandboxCsequences, "")}
    </>
  );
}
