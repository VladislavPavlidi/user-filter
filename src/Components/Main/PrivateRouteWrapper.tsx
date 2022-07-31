import React from 'react';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes';

interface IPrivateRoute {
  children: JSX.Element;
}

export default function PrivateRouteWrapper({ children }: IPrivateRoute) {

  // return children;
  // if (true) {
  // }
  return <Navigate to={ROUTES.login()} replace />;
}
