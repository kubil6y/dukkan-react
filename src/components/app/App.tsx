import React from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuth } from "../../auth/useAuth";
import { useUser } from "../../auth/useUser";
import { userAuthTokenState } from "../../recoil/atoms";
import { Routes } from "./Routes";

export const App = () => {
  const token = useRecoilValue(userAuthTokenState);
  const { getProfile } = useAuth();

  // TODO
  const { user } = useUser();
  console.log({
    user,
    token,
  });

  // eslint-disable-next-line
  const cbGetProfile = React.useCallback(() => getProfile(token), [token]);

  useEffect(() => {
    try {
      cbGetProfile();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <div>
      <Routes />
    </div>
  );
};
