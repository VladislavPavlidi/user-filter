import React from 'react'
import ROUTES from '../../routes'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  appBar: {
    width: '100%',
    padding: 1,
  },
  link: {
    color: '#fff',
    marginLeft: 10,
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Box
       sx={{
          padding: 1,
          width: '100%',
          height: 20,
       }}
       >
        <Link className={classes.link} to={ROUTES.home()}>На главную</Link>
        <Link className={classes.link} to={ROUTES.users()}>Пользователи</Link>
        <Link className={classes.link} to={ROUTES.profile()}>Профиль</Link>
      </Box>
    </AppBar>
  )
}
