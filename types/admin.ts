import { BME } from ".";
import {
  Action,
  ActionStatus,
  ActionStep,
  ActionStepAssignmentStatus,
  ActionStepStatus,
} from "./planner";
import { User } from "./index";

export interface HLSessionParams {
  time_range: {
    time_start_seconds: number;
    time_end_seconds: number;
  };

  user_email?: string;
  status?: string[];
  client_attributes?: {
    browser_name?: string[];
    os_name?: string[];
    os_version?: string[];
    device_category?: string[];
    device_vendor?: string[];
    device_model?: string[];
    device_model_version?: string[];
    device_architecture?: string[];
    device_resolution?: [number, number][];
    browser_version_major?: number[];
    browser_engine_name?: string[];
    browser_engine_version?: string[];
    hlapp_version?: string;
    hlwebapp_version?: string;
    hladmin_version?: string;
  };
  next_page?: string[] | null;
  num_records?: number;
}
export interface HLSessionResponse {
  items: {
    _id: string;
    type: string;
    created_at: string;
    accessed_at: string[];
    client_attributes: {
      device_category: string;
      device_vendor: string;
      device_model: string;
      device_model_version: string;
      device_architecture: string;
      device_resolution: [number, number];
      hladmin_version: string;
    };
    status: string;
    user: {
      type: string;
      _id: string;
    };
  }[];
  next_page: string[] | null;
  limit: number;
}

export interface RLSAttachParams {
  hl_session_id: string;
}
export interface RLSDetachParams {
  hl_session_id: string;
}

export interface CDRGetParams {
  _id: string;
}
export interface CDRGetResponse {
  _id: string;
  type: string;
  revision_id_from: string;
  revision_id_to: string;
  payload: any;
}
export interface RevisionListParams {
  _id: string;
  order: "desc" | "asc";
  next_page?: string[] | null;
}

export interface Revision {
  type: string;
  _id: string;
  revision_id_from: string | null;
  revision_id_to: string;
  payload: any;
}
export interface RevisionListResponse {
  next_page?: string[] | null;
  items: {
    _id: string;
    type: string;
    name: string;
    created_at: string;
    created_by: {
      type: string;
      _id: string;
    };
    revisions: Revision[];
  }[];
}

export type ESRIndex = "action" | "action_step" | "action_step_assignment";
export type ESRIndexName = "Action" | "Action Step" | "Action Step Assignment";
export interface ESRQueryParams {
  index_name: ESRIndex;
  query: object;
  size: number;
}

type StepSummary = Record<string, number>;
interface ActionSource {
  type: "cdr:action";
  action_id: string;
  description: string;
  status: ActionStatus;
  project: string | null;
  bme: BME;
  step_summary: StepSummary;
  is_owner: boolean;
  is_participant: boolean;
}

interface ActionStepSource {
  type: "cdr:action:step";
  step_id: string;
  action: Action;
  bme: BME;
  step_name: string;
  step_attributes: Record<string, string>;
  status: ActionStepStatus[];
  assignment_summary: any[];
}

type When = Record<string, string[]>;
interface ActionStepAssignmentSource {
  type: "cdr:action:step:assignment";
  status: ActionStepAssignmentStatus;
  assignee: User;
  bme: BME;
  step: ActionStep;
  action: Action;
  when: When;
  ts_when: number[];
}

export interface ESRQueryResponseHits {
  _index: ESRIndex;
  _id: string;
  _score: number;
  _source: ActionSource | ActionStepSource | ActionStepAssignmentSource;
}
export interface ESRQueryResponse {
  items: {
    total: number;
    hits: ESRQueryResponseHits[];
  };
}

export interface AnalyticsListParams {
  time_range: {
    time_start_seconds: number;
    time_end_seconds: number;
  };
  num_records?: number;
}

interface AnalyticsItem {
  count_by_type: {
    hlwebapp: number;
    hladmin: number;
    hlapp: number;
  };
  active_sessions: Record<string, number>;
  count_all_records: number;
  os_name: {
    Unknown: number;
    windows: number;
  };
  os_version: {
    Unknown: number;
    "10.0": number;
  };
  device_category: {
    desktop: number;
    Unknown: number;
    tablet: number;
  };
  device_vendor: Record<string, number>;
  device_model: Record<string, number>;
  device_model_version: Record<string, number>;
  device_architecture: Record<string, number>;
  device_resolution: {
    Unknown: number;
    "1080,2400": number;
  };
  browser_name: {
    chrome: number;
    Unknown: number;
  };
  browser_version_major: {
    "116": number;
    Unknown: number;
  };
  browser_engine_name: {
    Blink: number;
    Unknown: number;
  };
  browser_engine_version: Record<string, number>;
  hladmin_version: {
    Unknown: number;
    "3.1.4": number;
  };
  hlwebapp_version: Record<string, number>;
  hlapp_version: {
    Unknown: number;
    "1.2.3": number;
  };
  device_resolution_analytics: {
    resolution: string;
    os_name: Record<string, number>;
  }[];
  os_version_analytics: {
    os_version: string;
    os_name: Record<string, number>;
  }[];
}

/**TODO:
 * 
 * switch to using the following type definition after fixing backend response:
 * {
 *  items: AnalyticsItem[];
 * }
 */
export type AnalyticsListResponse = AnalyticsItem[];
