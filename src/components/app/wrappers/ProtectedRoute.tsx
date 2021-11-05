import { Redirect, Route, RouteProps } from "react-router";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../../recoil/selectors";

export type ProtectedRouteProps = {
  pathname: string;
} & RouteProps;

export const ProtectedRoute = ({
  pathname,
  ...routeProps
}: ProtectedRouteProps) => {
  const { isLoggedIn } = useRecoilValue(userInfo);
  if (isLoggedIn) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname }} />;
  }
};
