import { Redirect, Route, RouteProps } from "react-router";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/selectors";

export type UnauthenticatedRouteProps = {
  pathname: string;
} & RouteProps;

export const UnauthenticatedRoute = ({
  pathname,
  ...routeProps
}: UnauthenticatedRouteProps) => {
  const { isLoggedIn } = useRecoilValue(userInfoState);
  if (!isLoggedIn) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname }} />;
  }
};
