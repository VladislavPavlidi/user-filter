import React from "react";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";

const useStyles = makeStyles(() => ({
  appBar: {
    width: "100%",
    padding: 10,
  },
  link: {
    color: "#fff",
    marginLeft: 10,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Box
        sx={{
          padding: 1,
          width: "100%",
          height: 20,
        }}
      >
        <Link className={classes.link} to={ROUTES.home()}>
          На главную
        </Link>
        <Link className={classes.link} to={ROUTES.users()}>
          Пользователи
        </Link>
        <Link className={classes.link} to={ROUTES.profile()}>
          Профиль
        </Link>
      </Box>
    </AppBar>
  );
}
