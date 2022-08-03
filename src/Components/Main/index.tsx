import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Profile from "../../Pages/Profile";
import User from "../../Pages/User";
import ROUTES from "../../routes";
import PrivateRouteWrapper from "./PrivateRouteWrapper";
import PublicRouteWrapper from "./PublicRouteWrapper";
import Users from "../../Pages/Users";

const useStyles = makeStyles(() => ({
  main: {
    paddingTop: 100,
  },
}));

export default function Main() {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Routes>
        <Route path={ROUTES.home()} element={<Home />} />
        <Route path={ROUTES.users()} element={<Users />} />
        <Route path={ROUTES.user()} element={<User />} />
        <Route
          path={ROUTES.login()}
          element={
            <PublicRouteWrapper>
              <Login />
            </PublicRouteWrapper>
          }
        />
        <Route
          path={ROUTES.profile()}
          element={
            <PrivateRouteWrapper>
              <Profile />
            </PrivateRouteWrapper>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.home()} replace />} />
      </Routes>
    </main>
  );
}
