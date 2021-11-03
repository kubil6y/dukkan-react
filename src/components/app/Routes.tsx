import { Switch, Router, Route } from "react-router-dom";

const noAuthRoutes = [
  { id: 0, path: "/login", component: <h1>Login page</h1>, exact: true },
  { id: 1, path: "/register", component: <h1>Register page</h1> },
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
];

const commonRoutes = [
  { id: 100, path: "/", component: <h1>Home.page</h1>, exact: true },
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
