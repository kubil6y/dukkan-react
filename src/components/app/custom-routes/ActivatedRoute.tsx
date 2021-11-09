import { Redirect, Route, RouteProps } from "react-router";
import { useUser } from "../../../auth/useUser";

export type ActivatedRouteProps = {
  pathname: string;
} & RouteProps;

export const ActivatedRoute = ({
  pathname,
  ...routeProps
}: ActivatedRouteProps) => {
  const { user } = useUser();
  if (user && user.is_activated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname }} />;
  }
};
