import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import UserCard, { IUserCard } from "./Card";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { selectUsers, usersAsync } from "../../Features/Users/usersSlice";

export default function Users() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    if (!users.length) dispatch(usersAsync());
  }, []);

  if (!users.length) return null;

  return (
    <Grid container spacing={2} gap={5} justifyContent="center">
      {users.map((user: IUserCard) => (
        <UserCard
          id={user?.id}
          avatar={user?.avatar}
          email={user?.email}
          first_name={user?.first_name}
          last_name={user?.last_name}
          key={user?.id}
        />
      ))}
    </Grid>
  );
}
