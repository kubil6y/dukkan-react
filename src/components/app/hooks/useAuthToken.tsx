import { useState } from "react";
import {
  getUserAuthTokenLocalStorage,
  setUserAuthTokenLocalStorage,
  clearUserAuthTokenLocalStorage,
} from "../../../local-storage";

interface UseAuthToken {
  token: string;
  updateAuthToken(token: string): void;
  clearAuthToken(): void;
}

export const useAuthToken = (): UseAuthToken => {
  const [token, setToken] = useState<string>(getUserAuthTokenLocalStorage());

  function updateAuthToken(token: string): void {
    setUserAuthTokenLocalStorage(token);
    setToken(token);
  }

  function clearAuthToken(): void {
    clearUserAuthTokenLocalStorage();
    setToken("");
  }

  return {
    token,
    updateAuthToken,
    clearAuthToken,
  };
};
