import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import UserCard, { IUserCard } from "./Card";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { selectUsers } from "../../Features/Users/usersSlice";
import useGetParams from "../../Hooks/useGetParams";
import { setUserFilter } from "../../Features/UserFilter";

export default function Cards() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const firstMount = useRef(true);
  const [cards, setCards] = useState<IUserCard[]>(users);
  const filter = useGetParams();

  useEffect(() => {
    if (!firstMount.current) {
      setCards(users);
    }
  }, [users]);

  useEffect(() => {
    dispatch(setUserFilter(filter));
  }, []);

  useEffect(() => {
    if (Object.values(filter).length > 0) {
      setCards(
        users.filter((user: any) =>
          Object.entries(filter).every(([key, value]: any) =>
            // user[key].toLowerCase().include(value.toLowerCase()) // second filter option
            user[key].toLowerCase().startsWith(value.toLowerCase())
          )
        )
      );
    } else {
      setCards(users);
    }
  }, [filter]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  if (!users.length) return null;

  return (
    <Grid container gap={5} justifyContent="center">
      {cards.map((user: IUserCard) => (
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
