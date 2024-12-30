import { create } from "zustand";
import { StoreFunctionReturn } from "@/types";
import {
  SandboxListResponse,
  SandboxRunParams,
  SandboxRunResponse,
} from "@/types/sandbox";
import { sandboxList, sandboxRun } from "@/api/sandbox";

type SandboxList = {
  loading: boolean;
  sandboxCsequences: SandboxListResponse["items"];
  listSandbox: () => StoreFunctionReturn;
};
export const useSandboxListStore = create<SandboxList>((set) => ({
  loading: false,
  sandboxCsequences: [],

  listSandbox: async () => {
    set({ loading: true });
    try {
      const res = await sandboxList();
      if (res?.success) {
        set({ sandboxCsequences: res.result.items });
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },
}));

type SandboxRun = {
  loading: boolean;
  status: "start" | "complete" | null;
  sandboxResponse: SandboxRunResponse | null;
  selectedSequence: string | null;
  run: () => StoreFunctionReturn;
  handleSelectSequence: (sequence: string) => void;
  start: () => void;
  complete: () => void;
};
export const useSandboxRunStore = create<SandboxRun>((set) => ({
  loading: false,
  sandboxResponse: null,
  selectedSequence: null,
  status: null,

  run: async () => {
    set({ loading: true });
    try {
      const selectedSequence = useSandboxRunStore.getState().selectedSequence;
      if (!selectedSequence) {
        return false;
      }

      const params: SandboxRunParams = {
        cseq_path: selectedSequence,
      };
      const res = await sandboxRun(params);

      if (res?.success) {
        set({ sandboxResponse: res.result });
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },
  handleSelectSequence: (sequence: string) => {
    // remove first "/" character
    const path = sequence.slice(1);
    set({ selectedSequence: path });
  },
  start: () => {
    set({ status: "start" });
  },
  complete: () => {
    set({ status: "complete" });
  },
}));
