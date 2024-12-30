import { ApiEndPoints } from "@/api/api-end-points";
import { toast } from "sonner";
import { ApiResponse } from "@/types";
import axios from "axios";
import { getTokenAndType } from "@/stores/cookie-storage";

export async function getData<T>(
  method: string,
  params: any = {},
  options: { useAuth?: boolean; baseURL?: string } = {
    useAuth: true,
  }
): Promise<ApiResponse<T> | undefined> {
  try {
    const auth = resolveAuth(options?.useAuth);

    // If auth is undefined, exit early (unauthenticated case)
    if (auth === undefined) {
      toast.error("Please login to continue, you're unauthenticated");
      return;
    }

    const body = {
      jsonrpc: ApiEndPoints.jsonrpc,
      id: ApiEndPoints.id,
      version: ApiEndPoints.version,
      method,
      params,
      auth,
    };

    const baseURL: string =
      options.baseURL ?? ApiEndPoints.base_url_admin ?? "";

    if (!baseURL) {
      toast.error("Base URL is not defined. Please check the configuration.");
      throw new Error(
        "Base URL is not defined. Please check the configuration."
      );
    }

    const res = await axios.post(baseURL, body);

    return { result: res.data.result, success: true };
  } catch (error: any) {
    if (error.response?.data?.error) {
      toast.error(error.response?.data?.error.message);
    } else {
      toast.error(error.message);
    }
    console.log("Error: ", error);
  }
}

function resolveAuth(
  useAuth?: boolean
): { token: string; type: string } | undefined | object {
  if (useAuth) {
    const auth = getTokenAndType();

    if (!auth?.token || !auth?.type) {
      return undefined; // Stop the call if unauthenticated
    }

    return { token: auth.token, type: auth.type }; // Include auth object
  }

  return {}; // No auth needed
}
