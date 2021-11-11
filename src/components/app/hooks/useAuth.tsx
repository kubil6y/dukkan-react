import axios from "axios";
import { useCustomToast } from ".";
import { axiosInstance } from "../../../axios/axiosInstance";
import { CreateAuthenticationTokenDTO, RegisterDTO } from "../../../types";
import { useAuthToken } from "./useAuthToken";
import { useUser } from "./useUser";

export interface UseAuth {
  getProfile: (token: string) => Promise<void>;
  login: (input: CreateAuthenticationTokenDTO) => Promise<void>;
  register: (input: RegisterDTO) => Promise<void>;
  logout: () => void;
}

const SERVER_ERROR =
  "The server encountered a problem and could not process your request";

export function useAuth(): UseAuth {
  const { updateAuthToken, clearAuthToken } = useAuthToken();
  const { clearUser, updateUser } = useUser();
  const toast = useCustomToast();

  async function login(input: CreateAuthenticationTokenDTO) {
    try {
      const {
        data: { ok, data },
      } = await axiosInstance({
        url: "/login",
        method: "POST",
        data: input,
      });

      if (ok) {
        updateUser(data!.user);
        updateAuthToken(data!.authentication_token!.token);
      }
    } catch (error) {
      let title = "";
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.error &&
          typeof error?.response?.data?.error === "string"
        ) {
          title = error.response.data.error;
        } else if (
          error?.response?.data?.error &&
          typeof error?.response?.data?.error === "object"
        ) {
          const fields = Object.keys(error.response.data.error);
          title = `Invalid fields ${fields.join(", ")}`;
        } else {
          title = "Something went wrong";
        }
      } else {
        title = SERVER_ERROR;
      }
      toast({
        title: title,
        status: "error",
      });
      throw error;
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
      } = await axiosInstance({
        url: "/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (ok) {
        // update user state
        updateUser(data?.user);
      }
    } catch (error) {
      let title = "";
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.error &&
          error.response.data.error === "invalid or missing token"
        ) {
          // token is invalid
          clearAuthToken();
          clearUser();
        } else if (
          error?.response?.data?.error &&
          typeof error?.response?.data?.error === "string"
        ) {
          title = error.response.data.error;
        } else if (
          error?.response?.data?.error &&
          typeof error?.response?.data?.error === "object"
        ) {
          const fields = Object.keys(error.response.data.error);
          title = `Invalid fields ${fields.join(", ")}`;
        } else {
          title = "Something went wrong";
        }
      } else {
        title = SERVER_ERROR;
      }
      toast({
        title: title,
        status: "error",
      });
      throw error;
    }
  }

  function logout() {
    clearUser();
  }

  async function register(input: RegisterDTO) {
    try {
      await axiosInstance({
        url: "/register",
        method: "POST",
        data: input,
      });
    } catch (error) {
      let title = "";
      if (axios.isAxiosError(error)) {
        if (
          error?.response?.data?.error &&
          typeof error?.response?.data?.error === "string"
        ) {
          title = error.response.data.error;
        } else if (
          error?.response?.data?.error &&
          typeof error?.response?.data?.error === "object"
        ) {
          const fields = Object.keys(error.response.data.error);
          title = `Invalid fields ${fields.join(", ")}`;
        } else {
          title = "Something went wrong";
        }
      } else {
        title = SERVER_ERROR;
      }
      toast({
        title: title,
        status: "error",
      });
      throw error;
    }
  }

  return {
    login,
    getProfile,
    logout,
    register,
  };
}
