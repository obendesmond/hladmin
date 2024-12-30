import { create } from "zustand";
import {
  CDRGetParams,
  CDRGetResponse,
  ESRIndex,
  ESRIndexName,
  ESRQueryParams,
  ESRQueryResponse,
  RevisionListParams,
  RevisionListResponse,
} from "@/types/admin";
import { StoreFunctionReturn } from "@/types";
import {
  dataExploreCdrGet,
  dataExploreEsrQuery,
  dataExploreRevisionList,
} from "@/api/admin";

export const esrEntities: {
  name: ESRIndexName;
  index: ESRIndex;
}[] = [
  { name: "Action", index: "action" },
  { name: "Action Step", index: "action_step" },
  { name: "Action Step Assignment", index: "action_step_assignment" },
];

type ExploreStore = {
  loading: boolean;
  esrQueryData: ESRQueryResponse["items"] | null;
  currentActionSteps: ESRQueryResponse["items"] | null;
  currentActionStepAssignments: ESRQueryResponse["items"] | null;
  revisionList: RevisionListResponse["items"] | null;
  next_page: RevisionListResponse["next_page"];
  currentCDR: CDRGetResponse | null;

  doCDRGet: (params: CDRGetParams) => StoreFunctionReturn;
  getRevisionList: (params: RevisionListParams) => StoreFunctionReturn;
  doESRQuery: (params: ESRQueryParams) => StoreFunctionReturn;
};

export const useDataExploreStore = create<ExploreStore>((set) => ({
  loading: false,
  esrQueryData: null, // could be action or action step or action step assignment
  currentActionSteps: null, // only the steps for an action
  currentActionStepAssignments: null, // assignments under an action or step
  revisionList: null,
  next_page: null,
  currentCDR: null,

  doCDRGet: async (params: CDRGetParams) => {
    set({ currentCDR: null, loading: true });
    try {
      const res = await dataExploreCdrGet(params);
      const revisionRes = await dataExploreRevisionList({
        _id: params._id,
        order: "asc",
        next_page: null,
      });
      if (res?.success && revisionRes?.success) {
        set({
          currentCDR: res.result,
          revisionList: revisionRes.result.items,
          next_page: revisionRes.result.next_page,
        });
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },
  getRevisionList: async (params: RevisionListParams) => {
    set({ loading: true });
    try {
      const res = await dataExploreRevisionList(params);
      if (res?.success) {
        set({
          revisionList: res.result.items,
          next_page: res.result.next_page,
        });
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },

  // this esr query will get action->steps->assignments, step->assignments or assignments
  doESRQuery: async (params: ESRQueryParams) => {
    set({
      esrQueryData: null,
      currentActionSteps: null,
      currentActionStepAssignments: null,
      loading: true,
    });

    try {
      const res = await dataExploreEsrQuery(params);

      if (res?.success) {
        const items = res.result.items;
        const firstItem = items.hits?.[0]?._source;

        set({ esrQueryData: items });

        if (!firstItem) return res.success;

        if (firstItem.type === "cdr:action" && firstItem.action_id) {
          const [actionSteps, actionStepAssignments] = await Promise.all([
            fetchEsrData({
              index_name: "action_step",
              query: {
                bool: {
                  filter: [{ term: { "action._id": firstItem.action_id } }],
                },
              },
              size: 1000,
            }),
            fetchEsrData({
              index_name: "action_step_assignment",
              query: {
                bool: {
                  filter: [{ term: { "action._id": firstItem.action_id } }],
                },
              },
              size: 1000,
            }),
          ]);

          set({
            currentActionSteps: actionSteps,
            currentActionStepAssignments: actionStepAssignments,
          });
        } else if (firstItem.type === "cdr:action:step" && firstItem.step_id) {
          const stepAssignments = await fetchEsrData({
            index_name: "action_step_assignment",
            query: {
              bool: {
                filter: [{ term: { "step._id": firstItem.step_id } }],
              },
            },
            size: 1000,
          });

          set({ currentActionStepAssignments: stepAssignments });
        }

        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },
}));

// Helper function to fetch ESR data
const fetchEsrData = async (params: ESRQueryParams) => {
  const res = await dataExploreEsrQuery(params);
  return res?.success ? res.result.items : null;
};
