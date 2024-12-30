import { create } from "zustand";
import {
  createFirebaseDummyUser,
  getUser,
  userLogin,
  userLoginChallenge,
  userLogout,
} from "@/api/user";
import {
  User,
  UserLoginChallengeParams,
  UserLoginParams,
  UserLoginResponse,
} from "@/types/user";
import { StoreFunctionReturn } from "@/types";
import {
  clearStorage,
  storeRechallengeToken,
  storeTokenAndType,
} from "./cookie-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface UserState {
  reply_token: string;
  rechallenge_token: string;
  keyboard: UserLoginResponse["keyboard"] | null;
  token: string;
  type: string;

  loading: boolean;
  user?: User;
  login: (params: UserLoginParams) => StoreFunctionReturn;
  loginChallenge: (challenge_code: string) => StoreFunctionReturn;
  firebaseSignin: () => StoreFunctionReturn;
  getAuthUser: () => StoreFunctionReturn;
  logout: () => StoreFunctionReturn;
}

export const useUserStore = create<UserState>((set) => ({
  reply_token: "",
  rechallenge_token: "",
  keyboard: null,
  token: "",
  type: "",
  loading: false,
  user: undefined,

  login: async (params: UserLoginParams) => {
    set({ loading: true });
    try {
      const res = await userLogin(params);

      if (res?.success && res.result) {
        set({
          reply_token: res.result.reply_token,
          rechallenge_token: res.result.rechallenge_token,
          keyboard: res?.result.keyboard,
        });
        storeRechallengeToken(res.result.rechallenge_token);
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },

  loginChallenge: async (challenge_code: string) => {
    set({ loading: true });
    try {
      const params: UserLoginChallengeParams = {
        challenge_code,
        reply_token: useUserStore.getState().reply_token,
      };

      const res = await userLoginChallenge(params);

      if (res?.success && res.result) {
        set({
          token: res.result.token,
          type: res.result.type,
        });
        storeTokenAndType(res.result.token, res.result.type);
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },
  
  firebaseSignin: async () => {
    set({ loading: true });
    try {
      const userRes = await createFirebaseDummyUser();

      if (userRes?.success && userRes.result) {
        await signInWithEmailAndPassword(
          auth,
          userRes?.result.email,
          userRes?.result.password
        );
        return userRes.success;
      }
    } finally {
      set({ loading: false });
    }
  },

  getAuthUser: async () => {
    set({ loading: true });
    try {
      const res = await getUser();

      if (res?.success && res.result) {
        set({ user: res.result });
        return res.success;
      }
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      // firebase logout
      await auth.signOut();
      const res = await userLogout();
      if (res?.success) {
        clearStorage();
        set({
          token: "",
          type: "",
          reply_token: "",
          rechallenge_token: "",
          user: undefined,
        });
        return res.success;
      }
    } finally {
    }
  },
}));
