import { Redirect, Route, RouteProps } from "react-router";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../../recoil/selectors";

export type InactivatedRouteProps = {
  pathname: string;
} & RouteProps;

export const InactivatedRoute = ({
  pathname,
  ...routeProps
}: InactivatedRouteProps) => {
  const { isActivated, isLoggedIn } = useRecoilValue(userInfo);
  if (!isActivated && isLoggedIn) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname }} />;
  }
};
