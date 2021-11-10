import { Redirect, Route, RouteProps } from "react-router";
import { useUser } from "../hooks";

export type InactivatedRouteProps = {
  pathname: string;
} & RouteProps;

export const InactivatedRoute = ({
  pathname,
  ...routeProps
}: InactivatedRouteProps) => {
  const { user } = useUser();
  if (user && !user.is_activated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname }} />;
  }
};
