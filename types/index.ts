export interface ApiResponse<T> {
  result: T;
  success: boolean;
}

export type StoreFunctionReturn = Promise<boolean | undefined>;

export interface Region {
  type: "cdr:region";
  _id: string;
  title: string;
  tz: string;
  country_code: string;
  continent_code: string;
}

export interface BME {
  type: "cdr:bme";
  _id: string;
  name: string;
  address: string;
  region: Region;
}

export interface User {
  type: "cdr:user";
  _id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  region: Region;
}
