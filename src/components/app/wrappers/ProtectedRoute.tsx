import { Redirect, Route, RouteProps } from "react-router";
import { useUser } from "../../../auth/useUser";

export type ProtectedRouteProps = {
  pathname: string;
} & RouteProps;

export const ProtectedRoute = ({
  pathname,
  ...routeProps
}: ProtectedRouteProps) => {
  const { user } = useUser();
  if (user) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname }} />;
  }
};
