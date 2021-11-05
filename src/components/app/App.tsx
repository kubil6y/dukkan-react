import React from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuth } from "../../auth/useAuth";
import { useUser } from "../../auth/useUser";
import { userAuthTokenState } from "../../recoil/atoms";
import { Routes } from "./Routes";
import { Container } from "./Container";
import { Navbar } from "../navbar/Navbar";
import { useLocation } from "react-router-dom";
import { includes } from "../../helpers";
import { UserMenu } from "../menus/user-menu/UserMenu";

export const App = () => {
  const { pathname } = useLocation();
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

  const showNavbar = !includes(["/register", "/login"], pathname);
  return (
    <div>
      {showNavbar && <Navbar />}
      <Container>
        <Routes />
      </Container>
      <UserMenu />
    </div>
  );
};
