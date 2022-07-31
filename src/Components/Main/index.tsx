import React from "react";
import { Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CounterPage from "../../Pages/Counter";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Profile from "../../Pages/Profile";
import ROUTES from "../../routes";
import PrivateRouteWrapper from "./PrivateRouteWrapper";
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
        <Route path={ROUTES.counter()} element={<CounterPage />} />
        <Route path={ROUTES.users()} element={<Users />} />
        <Route path={ROUTES.login()} element={<Login />} />
        <Route
          path={ROUTES.profile()}
          element={
            <PrivateRouteWrapper>
              <Profile />
            </PrivateRouteWrapper>
          }
        />
      </Routes>
    </main>
  );
}
