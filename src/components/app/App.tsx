import React from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuth } from "./hooks";
import { userAuthTokenState } from "../../recoil/atoms";
import { Routes } from "./Routes";
import { Navbar } from "../navbar/Navbar";
import { useLocation } from "react-router-dom";
import { includes } from "../../helpers";
import { Footer } from "./Footer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// setup dayjs
dayjs.extend(relativeTime);

export const App = () => {
  const { pathname } = useLocation();
  const token = useRecoilValue(userAuthTokenState);
  const { getProfile } = useAuth();

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

  const show = !includes(["/register", "/login"], pathname);
  return (
    <div>
      {show && <Navbar />}
      <Routes />
      {show && <Footer />}
    </div>
  );
};
