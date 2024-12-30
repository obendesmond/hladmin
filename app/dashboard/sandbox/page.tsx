"use client";
import JsonView from "@/components/json-view";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/firebase";
import { useSandboxRunStore } from "@/stores/sandbox-store";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function SandboxContent() {
  const { sandboxResponse, start, complete } = useSandboxRunStore();
  const [commandRuns, setCommandRuns] = useState<DocumentData[]>([]);
  const resultsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sandboxResponse?.firestore) return;

    const docRef = doc(
      db,
      "sandbox",
      sandboxResponse.firestore.csequence_run_id
    );
    onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        if (docSnapshot.get('status') === "start")  start()
        else if (docSnapshot.get('status') === 'complete') complete()
      } else {
        toast.error("Sandbox document does not exist!");
      }
    });

    const commandsRef = collection(
      db,
      sandboxResponse.firestore.command_run_collection
    );
    const commandsQuery = query(commandsRef, orderBy("created_at", "asc"));
    onSnapshot(commandsQuery, (snapshot) => {
      const updatedCommands = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("commands: ", updatedCommands)
      setCommandRuns(updatedCommands);

      // scroll to last item
      if (resultsContainerRef.current) {
        resultsContainerRef.current.scrollTo({
          top: resultsContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  }, [sandboxResponse]);

  return (
    <div className="px-4 pb-4 bg-white w-full">
      <Tabs defaultValue="result">
        <div className="pt-4 sticky z-10 top-[57px] bg-white">
          <TabsList className=" grid grid-cols-2 w-[400px]">
            <TabsTrigger value="result">Result</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="result"
          className="w-full bg-gray-50 p-4 rounded h-full border overflow-y-auto"
          ref={resultsContainerRef}
        >
          {commandRuns.length === 0 ? (
            <p className="text-gray-500">No results to display yet.</p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {commandRuns.map((run) => (
                <AccordionItem key={run.id} value={run.id}>
                  <AccordionTrigger>{run.cmd_path}</AccordionTrigger>
                  <AccordionContent>
                    <JsonView jsonObj={run} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </TabsContent>
        <TabsContent
          value="details"
          className="w-full bg-gray-50 border p-4 rounded h-full"
        >
          <p className="text-gray-500">No details to display yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}