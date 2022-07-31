import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../App/hooks";
import { selectAuth } from "../../Features/Auth/authSlice";
import ROUTES from "../../routes";

interface IPrivateRoute {
  children: JSX.Element;
}

export default function PrivateRouteWrapper({ children }: IPrivateRoute) {
  const isLogged = useAppSelector(selectAuth);

  if (isLogged) {
    return children;
  }
  return <Navigate to={ROUTES.login()} replace />;
}
