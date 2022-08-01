import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import UserCard, { IUserCard } from "./Card";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import {
  filterUsers,
  selectUsers,
  usersAsync,
} from "../../Features/Users/usersSlice";
import useGetParams from "../../Hooks/useGetParams";

export default function Cards() {
  const dispatch = useAppDispatch();
  const filter = useGetParams();
  const users = useAppSelector(selectUsers);

  useEffect(() => {
    console.log(users, "users");
  }, [users]);

  useEffect(() => {
    if (!users.length) dispatch(usersAsync());
  }, []);

  useEffect(() => {
    dispatch(filterUsers(filter));
  }, [filter]);

  if (!users.length) return null;

  return (
    <Grid container gap={5} justifyContent="center">
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
