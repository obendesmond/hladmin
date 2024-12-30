interface ListStepsParams {
  list_type: "for_action" | "for_bme";
  ref_bme_id: string;
  status: ActionStepStatus[];
  next_page: string[] | null;
}

export interface ListStepsForActionParams extends ListStepsParams {
  action_id: string;
}

export type ActionStatus =
  | "closed"
  | "active"
  | "discarded"
  | "completed"
  | "new";
export type ActionStepStatus =
  | "complete"
  | "active"
  | "unassigned"
  | "discarded"
  | "new";
export type ActionStepAssignmentStatus =
  | "complete"
  | "active"
  | "unassigned"
  | "discarded"
  | "new";

export interface Action {
  type: "cdr:action";
  _id: string;
  description: string;
  status: ActionStatus;
  project: string | null;
  is_owner: boolean;
  is_participant: boolean;
}

type StepAttributes = Record<string, string>;
export interface ActionStep {
  type: "cdr:action:step";
  _id: string;
  step_name: string;
  status: "complete" | "incomplete" | "pending";
  step_attributes: StepAttributes;
};

export interface ListStepsForActionResponse {
  items: {
    _id: string;
    type: "cdr:action:step";
    step_name: string;
    status: ActionStepStatus;
    assignment_summary: {
      user_id: string;
      last_name: string | null;
      bme_id: string;
      first_name: string | null;
      email: string;
      status: ActionStepAssignmentStatus;
    }[];
    date: string;
    earliest_time: string;
    step_attributes: {
      description: string;
    };
    action: Action
  }[];
  next_page?: string[] | null;
}
