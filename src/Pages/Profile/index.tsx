import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useAppDispatch } from "../../App/hooks";
import { removeAuth } from "../../Features/Auth/authSlice";

export default function Profile() {
  const dispatch = useAppDispatch();
  return (
    <Container maxWidth="xs">
      <p>Вы авторизованы. Добро пожаловать в личный кабинет</p>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={() => dispatch(removeAuth())}
      >
        Выйти из аккаунта
      </Button>
    </Container>
  );
}
