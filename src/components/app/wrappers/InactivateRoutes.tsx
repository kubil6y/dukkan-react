import { Redirect, Route, RouteProps } from "react-router";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/selectors";

export type InactivatedRouteProps = {
  pathname: string;
} & RouteProps;

export const InactivatedRoute = ({
  pathname,
  ...routeProps
}: InactivatedRouteProps) => {
  const { isActivated, isLoggedIn } = useRecoilValue(userInfoState);
  if (!isActivated && isLoggedIn) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname }} />;
  }
};
