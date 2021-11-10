import { Redirect, Route, RouteProps } from "react-router";
import { useUser } from "../hooks";

export type UnauthenticatedRouteProps = {
  pathname: string;
} & RouteProps;

export const UnauthenticatedRoute = ({
  pathname,
  ...routeProps
}: UnauthenticatedRouteProps) => {
  const { user } = useUser();
  if (!user) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname }} />;
  }
};
