"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useHLSessionStore } from "@/stores/admin/hlsession-store";
import RLSLoader from "./components/RLSLoader";
import { useRLSStore } from "@/stores/admin/rls-store";
import { toast } from "sonner";
import { getDynamicTimeRange } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "./components/date-range-picker";
import { HLSessionParams } from "@/types/admin";

function RLS() {
  const router = useRouter();
  const { hl_sessions, getHLSessions, loading } = useHLSessionStore();
  const { attach, loading: attachLoading } = useRLSStore();
  const initialTimeRange = getDynamicTimeRange();
  const [filters, setFilters] = useState({
    time_range: {
      time_start_seconds: initialTimeRange.time_start_seconds,
      time_end_seconds: initialTimeRange.time_end_seconds,
    },
    status: "active",
    user_email: "",
    num_records: 1000,
  });
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current) {
      toast.info("Click on a session to attach");
      hasShownToast.current = true;
    }
    fetchHLSessions();
  }, []);

  const fetchHLSessions = async () => {
    const { time_range, status, user_email } = filters;

    if (!time_range.time_start_seconds || !time_range.time_end_seconds) {
      toast.error(
        "Both start and end times must be set to filter by date range."
      );
      return;
    }

    const params: HLSessionParams = {
      time_range,
      num_records: 1000,
    };

    if (status) {
      if (status !== "all") {
        params.status = [status];
      } else {
        params.status = ["active", "expired"];
      }
    }

    if (user_email) {
      params.user_email = user_email;
    }

    await getHLSessions(params);
  };

  const handleRowClick = (hl_session_id: string) => {
    if (!hl_session_id) return;
    // block attaching if already attaching to a session
    if (attachLoading) return;

    toast.promise(attach({ hl_session_id }), {
      loading: `Attaching session ${hl_session_id.slice(0,5)}...`,
      success: (succ) => {
        if (succ) {
          router.push(`/dashboard/rls/${hl_session_id}`);
          return `Session ${hl_session_id.slice(0,5)}... attached successfully`;
        } else {
          throw new Error(`Failed to attach session ${hl_session_id}`);
        }
      },
      error: (err) => err.message,
    });
  };

  const handleDateRangeChange = (timeRange: {
    time_start_seconds: number;
    time_end_seconds: number;
  }) => {
    setFilters((prev) => ({
      ...prev,
      time_range: timeRange,
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">
          HL Sessions ({hl_sessions.length})
        </h1>
        <div className="flex gap-4 items-center">
          <DateRangePicker
            timeStartSeconds={filters.time_range.time_start_seconds}
            timeEndSeconds={filters.time_range.time_end_seconds}
            onChange={handleDateRangeChange}
          />
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
            value={filters.status}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="User Email"
            value={filters.user_email}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, user_email: e.target.value }))
            }
            className="max-w-max"
          />
            <Button loading={loading} size="sm" onClick={fetchHLSessions}>
              Apply Filters
            </Button>
        </div>
      </div>

      {!hl_sessions  || loading ? (
        <RLSLoader />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Session ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Resolution</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hl_sessions.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={7}>No sessions found</TableCell>
              </TableRow>
            )}
              {hl_sessions.map((session) => (
                <TableRow
                  key={session._id}
                  className="cursor-pointer transition-colors hover:bg-gray-100 border"
                  onClick={() => handleRowClick(session._id ?? "")}
                >
                  <TableCell>
                    {session._id ?? ""}
                  </TableCell>
                  <TableCell>{session.user?._id ?? ""}</TableCell>
                  <TableCell>
                    {session.created_at
                      ? new Date(session.created_at).toLocaleString()
                      : ""}
                  </TableCell>
                  <TableCell>{renderStatusDot(session.status)}</TableCell>
                  <TableCell>{session.type ?? ""}</TableCell>
                  <TableCell>
                    {session.client_attributes?.device_resolution
                      ? session.client_attributes.device_resolution.join("x")
                      : ""}
                  </TableCell>
                  <TableCell>
                    {session.client_attributes?.device_category ?? ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

function renderStatusDot(status: "active" | "expired" | string) {
  if (status === "active") {
    return (
      <span className="flex items-center">
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-success-light"></span>
        </span>
        Active
      </span>
    );
  } else {
    return (
      <span className="flex items-center">
        <span className="h-3 w-3 rounded-full bg-gray-400 mr-2"></span>
        Expired
      </span>
    );
  }
}


export default RLS;
