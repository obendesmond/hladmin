"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams, useRouter } from "next/navigation";
import { useRLSStore } from "@/stores/admin/rls-store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import { CustomTooltip } from "@/components/custom-tooltip";
import JsonView from "@/components/json-view"

export default function SessionLogDetails() {
  const { detach, loading } = useRLSStore();
  const router = useRouter();
  const [logs, setLogs] = useState<DocumentData[]>([]);
  const [selectedLog, setSelectedLog] = useState<DocumentData | null>(null);
  const { id: sessionId } = useParams();
  const [methodName, setMethodName] = useState("");
  const [authType, setAuthType] = useState("");
  const [operationComplete, setOperationComplete] = useState("");
  const [filterLoading, setFilterLoading] = useState(false);
  const now = Timestamp.now();

  const logsRef = collection(
    db,
    "rls_sessions",
    sessionId as string,
    "log_entries"
  );

  useEffect(() => {
    return () => getLogs();
  }, [sessionId]);

  const getLogs = () => {
    const logsQuery = query(
      logsRef,
      where("timestamp", ">=", now),
      orderBy("timestamp", "asc"),
    );

    onSnapshot(logsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newLog = {
            id: change.doc.id,
            ...change.doc.data(),
          };

          setLogs((prevLogs) => [newLog, ...prevLogs]);
        }
      });
    });
  };

  const handleDetach = () => {
    if (!sessionId) return;
    // block detaching if already detaching from a session
    if (loading) return;

    toast.promise(detach({ hl_session_id: sessionId as string }), {
      loading: `Detaching session ${sessionId.slice(0, 5)}...`,
      success: (succ) => {
        if (succ) {
          router.push("/dashboard/rls");
          return `Session ${sessionId.slice(0, 5)}... detached successfully`;
        } else {
          throw new Error(`Failed to detach session ${sessionId}`);
        }
      },
      error: (err: any) => err.message,
    });
  };

  const applyFilters = () => {
    try {
      setFilterLoading(true);
      const conditions = [];

      if (methodName)
        conditions.push(where("request.method", "==", methodName));
      if (authType) conditions.push(where("request.auth.type", "==", authType));
      if (operationComplete)
        conditions.push(
          where(
            "operation_lifecycle.attributes.stage.settle.complete",
            "==",
            operationComplete === "true"
          )
        );

      // Construct the final query
      const logsQuery =
        conditions.length > 0
          ? query(logsRef, where("timestamp", ">=", now), ...conditions)
          : query(logsRef, where("timestamp", ">=", now), orderBy("timestamp", "desc"));

      // Execute the query and update logs state
      onSnapshot(logsQuery, (snapshot) => {
        const filteredLogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("filteredLogs: ", filteredLogs);
        setLogs(filteredLogs);
      });
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setFilterLoading(false);
    }
  };

  const reset = () => {
    setLogs([])
    setMethodName("");
    setAuthType("");
    setOperationComplete("");
    getLogs();
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handleDetach} loading={loading} size="sm">
          Detach
        </Button>
        <div className="flex gap-4">
          <Input
            placeholder="Method Name"
            value={methodName}
            onChange={(e) => setMethodName(e.target.value)}
          />
          <Input
            placeholder="Auth Type"
            value={authType}
            onChange={(e) => setAuthType(e.target.value)}
          />
          <Select
            onValueChange={(value) => setOperationComplete(value)}
            value={operationComplete}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Operation Complete" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={applyFilters} loading={filterLoading} size="sm">
            Apply Filters
          </Button>
          <div className="min-w-max">
            <CustomTooltip tooltipContent="reset filter">
              <Button
                size="icon"
                variant="outline"
                onClick={reset}
                className="rounded-full"
              >
                <RotateCcw />
              </Button>
            </CustomTooltip>
          </div>
        </div>
      </div>

      <div className="flex mt-6 gap-10">
        <div className="w-1/2 border-r pr-4">
          {logs.length === 0 && (
            <p>
              No log entries match filters, check your <i>spellings</i> and{" "}
              <i>casing</i> aswell
            </p>
          )}
          <ul>
            {logs.map((log) => (
              <Card
                onClick={() => setSelectedLog(log)}
                key={log.id}
                className={cn(
                  "mb-2 rounded-sm cursor-pointer shadow-none hover:shadow transition-all ease-in-out duration-200 border",
                  selectedLog?.id === log.id
                    ? "bg-background border-primary-dark"
                    : "",
                  log?.response?.error ? "border-red-500" : ""
                )}
              >
                <CardHeader className="p-2">
                  <CardTitle>Method: {log.request?.method}</CardTitle>
                  <CardDescription>ID: {log.id}</CardDescription>
                  <p className="text-sm">
                    Timestamp:
                    {new Date(log.timestamp?.seconds * 1000).toLocaleString()}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </ul>
        </div>

        <div className="w-1/2 h-full overflow-hidden">
          {selectedLog ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Log Details</h2>
              <p>
                <strong>ID:</strong> {selectedLog.id}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(
                  selectedLog.timestamp?.seconds * 1000
                ).toLocaleString()}
              </p>

              <h3 className="text-xl font-semibold mt-4">Request:</h3>
              <JsonView
                jsonObj={selectedLog.request}
                style={{ maxWidth: "40rem" }}
              />

              <h3 className="text-xl font-semibold mt-4">Response:</h3>
              {selectedLog.response ? (
                <JsonView
                  jsonObj={selectedLog.response}
                  style={{ maxWidth: "40rem" }}
                />
              ) : (
                <p>No response available</p>
              )}
            </div>
          ) : (
            logs.length > 0 && <p>Select a log entry to see details</p>
          )}
        </div>
      </div>
    </div>
  );
}
