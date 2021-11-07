import { Switch, Route } from "react-router-dom";
import {
  ProtectedRoute,
  UnauthenticatedRoute,
  InactivatedRoute,
} from "./wrappers";
import {
  CategoryPage,
  HomePage,
  LoginPage,
  RegisterPage,
  VerifyAccountPage,
  NotFoundPage,
  ProfilePage,
  UpdateProfilePage,
} from "../../pages";

const unauthenticatedRoutes = [
  { id: 0, path: "/login", component: <LoginPage />, exact: true },
  { id: 1, path: "/register", component: <RegisterPage /> },
];

const protectedRoutes = [
  { id: 11, path: "/me", component: <ProfilePage />, exact: true },
  { id: 12, path: "/me/edit", component: <UpdateProfilePage /> },
  { id: 12, path: "/my-orders", component: <h1>my orders page</h1> },
];

const inactivatedRoutes = [
  {
    id: 10,
    path: "/verify-account",
    component: <VerifyAccountPage />,
    exact: true,
  },
];

const commonRoutes = [
  { id: 100, path: "/", component: <HomePage />, exact: true },
  { id: 101, path: "/categories/:name", component: <CategoryPage /> },
];

export const Routes = () => {
  return (
    <Switch>
      {commonRoutes.map(({ id, path, component, exact }) => (
        <Route
          key={id}
          path={path}
          component={() => component}
          exact={Boolean(exact)}
        />
      ))}
      {unauthenticatedRoutes.map(({ id, path, component, exact }) => (
        <UnauthenticatedRoute
          pathname="/"
          key={id}
          path={path}
          component={() => component}
          exact={Boolean(exact)}
        />
      ))}
      {protectedRoutes.map(({ id, path, component, exact }) => (
        <ProtectedRoute
          pathname="/login"
          key={id}
          path={path}
          component={() => component}
          exact={Boolean(exact)}
        />
      ))}
      {inactivatedRoutes.map(({ id, path, component, exact }) => (
        <InactivatedRoute
          pathname="/login"
          key={id}
          path={path}
          component={() => component}
          exact={Boolean(exact)}
        />
      ))}
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};
