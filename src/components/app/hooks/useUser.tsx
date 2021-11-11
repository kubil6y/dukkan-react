import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  clearUserLocalStorage,
  getUserLocalStorage,
  setUserLocalStorage,
} from "../../../local-storage";
import { queryKeys } from "../../../react-query/constants";
import { getUser } from "../../../react-query/query.func";
import { User } from "../../../types";
import { useAuthToken } from "./useAuthToken";

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const { token } = useAuthToken();
  const [user, setUser] = useState(getUserLocalStorage());
  const queryClient = useQueryClient();

  // call useQuery to update user data from server
  useQuery(queryKeys.user, () => getUser(token), {
    enabled: Boolean(token),
    onSuccess: (axiosResponse) => setUser(axiosResponse?.data?.data?.user),
  });

  function updateUser(user: User): void {
    setUser(user);
    setUserLocalStorage(user);
    queryClient.setQueryData(queryKeys.user, user);
  }

  function clearUser(): void {
    setUser(null);
    clearUserLocalStorage();
    queryClient.setQueryData(queryKeys.user, null);

    // TODO cancel user queries from react-query
    // example ... queryClient.removeQueries([queryKeys.appointments, queryKeys.user]);
  }

  return {
    user,
    clearUser,
    updateUser,
  };
}
