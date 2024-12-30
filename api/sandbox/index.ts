import { ApiEndPoints } from "../api-end-points";
import { getData } from "..";
import { SandboxListResponse, SandboxRunParams, SandboxRunResponse } from "@/types/sandbox";

export const sandboxList = async () => {
  return await getData<SandboxListResponse>(ApiEndPoints.sandbox_list);
};

export const sandboxRun = async (params:SandboxRunParams) => {
  return await getData<SandboxRunResponse>(ApiEndPoints.sandbox_run, params, {
    useAuth: false,
    baseURL: ApiEndPoints.base_url_sandbox,
  });
};
