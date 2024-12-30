import {
  AnalyticsListParams,
  AnalyticsListResponse,
  CDRGetParams,
  CDRGetResponse,
  ESRQueryParams,
  ESRQueryResponse,
  HLSessionParams,
  HLSessionResponse,
  RevisionListParams,
  RevisionListResponse,
  RLSAttachParams,
  RLSDetachParams,
} from "@/types/admin";
import { ApiEndPoints } from "../api-end-points";
import { getData } from "..";

// dashboard analytics
export const anaylyticsList = async (params:AnalyticsListParams) => {
  return await getData<AnalyticsListResponse>(ApiEndPoints.anaylytics_list, params);
}

// hl session (rls)
export const hlSessionList = async (params: HLSessionParams) => {
  return await getData<HLSessionResponse>(ApiEndPoints.hl_session_list, params);
};

// rls
export const rlsAttach = async (params: RLSAttachParams) => {
  return await getData(ApiEndPoints.rls_attach, params);
};
export const rlsDetach = async (params: RLSDetachParams) => {
  return await getData(ApiEndPoints.rls_detach, params);
};

// data explore
export const dataExploreCdrGet = async (params: CDRGetParams) => {
  return await getData<CDRGetResponse>(ApiEndPoints.data_expore_cdr_get, params);
}
export const dataExploreRevisionList = async (params: RevisionListParams) => {
  return await getData<RevisionListResponse>(ApiEndPoints.data_expore_revision_list, params);
}
export const dataExploreEsrQuery = async (params: ESRQueryParams) => {
  return await getData<ESRQueryResponse>(ApiEndPoints.data_expore_esr_query, params);
}