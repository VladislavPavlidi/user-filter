import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes";

interface IPrivateRoute {
  children: JSX.Element;
}

const logged = false;
export default function PrivateRouteWrapper({ children }: IPrivateRoute) {
  if (logged) {
    return children;
  }
  return <Navigate to={ROUTES.login()} replace />;
}
