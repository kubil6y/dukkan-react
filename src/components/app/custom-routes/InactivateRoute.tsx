import { Redirect, Route, RouteProps } from "react-router";
import { useUser } from "../hooks";
import { ProtectedRoute } from "./ProtectedRoute";

export type InactivatedRouteProps = {
  pathname: string;
} & RouteProps;

export const InactivatedRoute = ({
  pathname,
  ...routeProps
}: InactivatedRouteProps) => {
  const { user } = useUser();
  if (!user) {
    return <ProtectedRoute pathname={pathname} />;
  }

  if (!user.is_activated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
};
