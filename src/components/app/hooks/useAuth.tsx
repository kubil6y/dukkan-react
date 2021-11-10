import { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { useCustomToast } from ".";
import { axiosInstance } from "../../../axios/axiosInstance";
import { USER_TOKEN } from "../../../constants";
import { userAuthTokenState } from "../../../recoil/atoms";
import { CreateAuthenticationTokenDTO, RegisterDTO } from "../../../types";
import { useUser } from "./useUser";

export interface UseAuth {
  getProfile: (token: string) => Promise<void>;
  createToken: (input: CreateAuthenticationTokenDTO) => Promise<void>;
  register: (input: RegisterDTO) => Promise<void>;
  logout: () => void;
}

export function useAuth(): UseAuth {
  const SERVER_ERROR =
    "The server encountered a problem and could not process your request";
  const setAuthTokenState = useSetRecoilState(userAuthTokenState);
  const { clearUser, updateUser } = useUser();
  const toast = useCustomToast();

  async function createToken(input: CreateAuthenticationTokenDTO) {
    try {
      const {
        data: { ok, data },
        status,
      } = await axiosInstance({
        url: "/tokens/authentication",
        method: "POST",
        data: input,
        headers: { "Content-Type": "application/json" },
      });

      if (status === 400) {
        toast({ title: data?.error, status: "warning" });
        return;
      }

      if (ok && data?.authentication_token?.token) {
        // update token state
        const t = data.authentication_token.token;
        localStorage.setItem(USER_TOKEN, JSON.stringify(t));
        setAuthTokenState(t);
      }
    } catch (e) {
      const err = e as AxiosError;
      if (err?.response?.data) {
        if (typeof err.response?.data?.error === "string") {
          toast({
            title: err.response?.data?.error || SERVER_ERROR,
            status: "error",
          });
        }
      } else {
        toast({
          title: "Something went wrong",
          status: "error",
        });
      }
      throw err;
    }
  }

  async function getProfile(token: string): Promise<void> {
    if (!token) {
      clearUser();
      return;
    }
    try {
      const {
        data: { ok, data },
        status,
      } = await axiosInstance({
        url: "/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (status === 401) {
        toast({ title: data?.error, status: "warning" });
        localStorage.removeItem(USER_TOKEN);
        return;
      }

      if (ok && data?.user) {
        // update user state
        updateUser(data.user);
      }
    } catch (e) {
      const err = e as AxiosError;
      if (err?.response?.data) {
        toast({
          title: err.response?.data?.error || SERVER_ERROR,
          status: "error",
        });
        localStorage.removeItem(USER_TOKEN);
      }
      throw err;
    }
  }

  function logout() {
    localStorage.removeItem(USER_TOKEN);
    clearUser();
  }

  async function register(input: RegisterDTO) {
    try {
      const {
        data: { data },
        status,
      } = await axiosInstance({
        url: "/register",
        method: "POST",
        data: input,
      });

      if (status === 422) {
        if (data?.error?.email) {
          toast({ title: data?.error?.email, status: "warning" });
        }
        return;
      }
    } catch (e) {
      const err = e as AxiosError;
      if (err?.response?.data) {
        if (typeof err.response?.data?.error?.email === "string") {
          toast({
            title: err.response?.data?.error?.email || SERVER_ERROR,
            status: "error",
          });
        }
      } else {
        toast({
          title: "Something went wrong",
          status: "error",
        });
      }
      throw err;
    }
  }

  return {
    createToken,
    getProfile,
    logout,
    register,
  };
}
