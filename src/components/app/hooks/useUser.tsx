import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/atoms";
import { User } from "../../../types";

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const [user, setUser] = useRecoilState(userState);

  function clearUser(): void {
    setUser(null);
  }

  function updateUser(u: User): void {
    setUser(u);
  }

  return {
    user,
    clearUser,
    updateUser,
  };
}
