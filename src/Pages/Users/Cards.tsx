import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Container, Modal } from "@mui/material";
import UserCard, { IUserCard } from "./Card";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { selectUsers } from "../../Features/Users/usersSlice";
import useGetParams from "../../Hooks/useGetParams";
import { setUserFilter } from "../../Features/UserFilter";
import ModalContent from "./ModalContent";

export default function Cards() {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const firstMount = useRef(true);
  const [open, setOpen] = useState<boolean>(false);
  const [cards, setCards] = useState<IUserCard[]>(users);
  const filter = useGetParams();

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
      </Grid>
    </>
  );
}
