import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Container, Modal, Typography } from "@mui/material";
import UserCard, { IUserCard } from "./Card";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { selectUsers } from "../../Features/Users/usersSlice";
import useGetParams from "../../Hooks/useGetParams";
import { setUserFilter } from "../../Features/UserFilter";
import ModalContent from "./ModalContent";
import { IFilterValues } from "./Filter";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export default function Cards() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const firstMount = useRef(true);
  const [open, setOpen] = useState<boolean>(false);
  const [cards, setCards] = useState<IUserCard[]>(users || []);
  const filter: IFilterValues = useGetParams();

  useEffect(() => {
    dispatch(setUserFilter(filter));
  }, []);

  useEffect(() => {
    const filterArray = Object.entries(filter) as Entries<typeof filter>;
    if (filterArray.length > 0) {
      setCards(
        users.filter((user: IUserCard) =>
          filterArray.every((value) => {
            // user[key].toLowerCase().include(value.toLowerCase()) // second filter option
            if (value) {
              return user[value[0]]
                .toLowerCase()
                .startsWith((value[1] || "").toLowerCase());
            }
            return false;
          })
        )
      );
    } else {
      setCards(users);
    }
  }, [filter]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  return (
    <>
      <Container
        sx={{
          marginBottom: 5,
        }}
      >
        <Grid mt={2} container direction="row" gap={5}>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            color="primary"
          >
            Добавить пользователя
          </Button>
        </Grid>
      </Container>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalContent setCards={setCards} setOpen={setOpen} />
      </Modal>
      <Grid container gap={5} justifyContent="center">
        {cards.length > 0 ? (
          <>
            {cards.map((user: IUserCard) => (
              <UserCard
                id={user?.id}
                avatar={user?.avatar}
                setCards={setCards}
                email={user?.email}
                first_name={user?.first_name}
                last_name={user?.last_name}
                key={user?.id}
              />
            ))}
          </>
        ) : (
          <Typography>ничего не найдено</Typography>
        )}
      </Grid>
    </>
  );
}
