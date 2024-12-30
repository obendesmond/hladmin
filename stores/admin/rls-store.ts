import { create } from "zustand";
import { RLSAttachParams, RLSDetachParams } from "@/types/admin";
import { StoreFunctionReturn } from "@/types";
import { rlsAttach, rlsDetach } from "@/api/admin";

type SessionStore = {
  loading: boolean;
  attach: (params: RLSAttachParams) => StoreFunctionReturn;
  detach: (params: RLSDetachParams) => StoreFunctionReturn;
};

export const useRLSStore = create<SessionStore>((set) => ({
  loading: false,

  attach: async (params: RLSAttachParams) => {
    set({ loading: true });
    try {
      const res = await rlsAttach(params);
      if (res?.success) {
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },
  detach: async (params: RLSDetachParams) => {
    set({ loading: true });
    try {
      const res = await rlsDetach(params);
      if (res?.success) {
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },
}));
