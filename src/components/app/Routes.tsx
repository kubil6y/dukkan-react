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
  ProductDetailsPage,
  MyOrdersPage,
} from "../../pages";

const unauthenticatedRoutes = [
  { id: 0, path: "/login", component: <LoginPage />, exact: true },
  { id: 1, path: "/register", component: <RegisterPage /> },
];

const protectedRoutes = [
  { id: 11, path: "/me", component: <ProfilePage />, exact: true },
  { id: 12, path: "/me/edit", component: <UpdateProfilePage /> },
  { id: 13, path: "/my-orders", component: <MyOrdersPage /> },
];

const inactivatedRoutes = [
  {
    id: 100,
    path: "/verify-account",
    component: <VerifyAccountPage />,
    exact: true,
  },
];

const commonRoutes = [
  { id: 1000, path: "/", component: <HomePage />, exact: true },
  { id: 1001, path: "/categories/:slug", component: <CategoryPage /> },
  { id: 1002, path: "/products/:slug", component: <ProductDetailsPage /> },
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
