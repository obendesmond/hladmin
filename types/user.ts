export interface User {
  _id: string;
  type: string;
  email: string;
  first_name?: string;
  last_name?: string;
  region: {
    type: string;
    _id: string;
    title: string;
    tz: string;
  };
}

export interface UserLoginParams {
  email: string;
  attributes?: {
    os_name?: string;
    os_version?: string;
    device_category?: string;
    device_vendor?: string;
    device_model?: string;
    device_model_version?: string;
    device_architecture?: string;
    device_resolution?: [number, number];
    browser_name?: string;
    browser_version_major?: number;
    browser_engine_name?: string;
    browser_engine_version?: string;
    hlapp_version?: string;
    hlwebapp_version?: string;
    hladmin_version?: string;
  };
}

type FixedLengthArray<T, L extends number> = [T, ...T[]] & { length: L };
export interface UserLoginResponse {
  reply_token: string;
  rechallenge_token: string;
  keyboard: FixedLengthArray<string, 12>;
}

export interface UserLoginChallengeParams {
  challenge_code: string;
  reply_token: string;
}

export interface UserLoginChallengeResponse {
  type: string;
  token: string;
}

export interface FirebaseCreateDummyUserResponse {
  email: string;
  password: string;
}
