import { Switch, Route } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "../../pages";

const noAuthRoutes = [
  { id: 0, path: "/login", component: <LoginPage />, exact: true },
  { id: 1, path: "/register", component: <RegisterPage /> },
];

const protectedRoutes = [
  {
    id: 10,
    path: "/verify-account",
    component: <h1>Email verification page</h1>,
    exact: true,
  },
  { id: 11, path: "/me", component: <h1>My profile page</h1> },
  { id: 12, path: "/me/edit", component: <h1>Update profile page</h1> },
  { id: 12, path: "/my-orders", component: <h1>my orders page</h1> },
];

const commonRoutes = [
  { id: 100, path: "/", component: <HomePage />, exact: true },
];

export const Routes = () => {
  return (
    <Switch>
      {noAuthRoutes.map(({ id, path, component, exact }) => (
        <Route
          key={id}
          path={path}
          component={() => component}
          exact={Boolean(exact)}
        />
      ))}

      {protectedRoutes.map(({ id, path, component, exact }) => (
        <Route
          key={id}
          path={path}
          component={() => component}
          exact={Boolean(exact)}
        />
      ))}

      {commonRoutes.map(({ id, path, component, exact }) => (
        <Route
          key={id}
          path={path}
          component={() => component}
          exact={Boolean(exact)}
        />
      ))}
    </Switch>
  );
};
