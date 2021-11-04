import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuth } from "../../auth/useAuth";
import { userAuthTokenState } from "../../recoil/atoms";
import { Routes } from "./Routes";

export const App = () => {
  const { getProfile } = useAuth();
  const token = useRecoilValue(userAuthTokenState);

  useEffect(() => {
    try {
      getProfile(token);
    } catch (error) {
      console.log(error);
    }
  }, [token, getProfile]);

  return (
    <div>
      <Routes />
    </div>
  );
};
