import { create } from "zustand";
import { HLSessionParams, HLSessionResponse } from "@/types/admin";
import { StoreFunctionReturn } from "@/types";
import { hlSessionList } from "@/api/admin";

type SessionStore = {
  hl_sessions: HLSessionResponse["items"];
  loading: boolean;
  next_page?: HLSessionResponse["next_page"];
  limit?: HLSessionResponse["limit"];
  getHLSessions: (params: HLSessionParams) => StoreFunctionReturn;
};

export const useHLSessionStore = create<SessionStore>((set) => ({
  hl_sessions: [],
  loading: false,

  getHLSessions: async (params: HLSessionParams) => {
    set({ loading: true });
    try {
      const res = await hlSessionList(params);
      if (res?.success) {
        set({
          hl_sessions: res.result.items,
          next_page: res.result.next_page,
          limit: res.result.limit,
        });
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },
}));
