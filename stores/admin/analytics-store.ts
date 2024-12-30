import { create } from "zustand";
import { AnalyticsListParams, AnalyticsListResponse } from "@/types/admin";
import { StoreFunctionReturn } from "@/types";
import { anaylyticsList } from "@/api/admin";

type AnalyticsStore = {
  loading: boolean;
  // TODO:dashboardAnalytics: AnalyticsListResponse["items"];
  dashboardAnalytics: AnalyticsListResponse;

  getAnalytics: (params: AnalyticsListParams) => StoreFunctionReturn;
};

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  loading: false,
  dashboardAnalytics:[],

  getAnalytics: async (params) => {
    set({ loading: true });
    try {
      const res = await anaylyticsList(params);
      if (res?.success) {
        set({
          //TODO: dashboardAnalytics: res.result.items,
          dashboardAnalytics: res.result,
        });
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },
}));
