import Cookies from "js-cookie";

const store = (key: string, value: string) => {
  Cookies.set(key, value, {
    secure: true,
    sameSite: "strict",
    expires: 7, // 7 days
  });
};

export const storeTokenAndType = (token: string, type: string) => {
    store("token", token);
    store("type", type);
};

export const getTokenAndType = () => {
  const token = Cookies.get("token");
  const type = Cookies.get("type");

  if (token && type) {
    return { token, type };
  }
};

export const storeRechallengeToken = (rechallenge_token: string) => {
    store("rechallenge_token", rechallenge_token);
};
export const getRechallengeToken = () => {
  const rechallenge_token = Cookies.get("rechallenge_token");
  return rechallenge_token || null;
};

export const clearStorage = () => {
  Cookies.remove("token");
  Cookies.remove("type");
  Cookies.remove("rechallenge_token");
};
