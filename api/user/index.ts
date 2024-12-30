import { getData } from "@/api";
import { ApiEndPoints } from "@/api/api-end-points";
import {
  FirebaseCreateDummyUserResponse,
  User,
  UserLoginChallengeParams,
  UserLoginChallengeResponse,
  UserLoginParams,
  UserLoginResponse,
} from "@/types/user";

export const userLogin = async (params: UserLoginParams) => {
  return await getData<UserLoginResponse>(ApiEndPoints.sign_in_init, params, {
    useAuth: false,
  });
};

export const userLoginChallenge = async (params: UserLoginChallengeParams) => {
  return await getData<UserLoginChallengeResponse>(
    ApiEndPoints.sign_in_challenge_reply,
    params,
    { useAuth: false }
  );
};

export const createFirebaseDummyUser = async () => {
  return await getData<FirebaseCreateDummyUserResponse>(
    ApiEndPoints.create_firebase_dummy_user
  );
};

export const getUser = async () => {
  return await getData<User>(ApiEndPoints.get_user);
};

export const userLogout = async () => {
  return await getData(ApiEndPoints.sign_out, {}, { useAuth: true });
};
