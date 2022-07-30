import React from 'react'
import ROUTES from '../../routes'
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { makeStyles } from "@mui/material/styles";

// const useStyles = makeStyles(() => ({
//   appBar: {
//     width: '100%',
//     padding: 1,
//   },
// }));

export default function Header() {
  return (
    <AppBar sx={{
      padding: 1,
      width: '100%',
   }}>
      <Box
       sx={{
          padding: 1,
          width: '100%',
          height: 20,
       }}
       >
        <Link color="" href={ROUTES.home()}>На главную</Link>
        <Link color="white" href={ROUTES.users()}>Пользователи</Link>
        <Link color="white" href={ROUTES.profile()}>Профиль</Link>
      </Box>
    </AppBar>
  )
}
