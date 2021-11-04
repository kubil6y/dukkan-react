import React from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuth } from "../../auth/useAuth";
import { userAuthTokenState } from "../../recoil/atoms";
import { Routes } from "./Routes";

export const App = () => {
  const token = useRecoilValue(userAuthTokenState);
  const { getProfile } = useAuth();

  const memoizedGetProfile = React.useCallback(
    () => getProfile(token),
    [token]
  );

  useEffect(() => {
    try {
      memoizedGetProfile();
    } catch (error) {
      console.log(error);
    }
  }, [token, memoizedGetProfile]);

  return (
    <div>
      <Routes />
    </div>
  );
};
