/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-cycle */
import React, { MouseEvent, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";
import { useAppDispatch } from "../../App/hooks";
import { deleteUserAsync } from "../../Features/Users/usersSlice";

export interface IUserCard {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  setCards?: any;
}

export default function UserCard({
  id,
  email,
  first_name: firstName,
  setCards,
  last_name: lastName,
  avatar,
}: IUserCard) {
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  async function onDelete(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    setDisabled(true);
    await dispatch(deleteUserAsync(id));
    setCards((prev: IUserCard[]) =>
      prev.filter(({ id: cardId }: IUserCard) => cardId !== id)
    );
  }

  return (
    <Card sx={{ width: 345 }}>
      <Link to={ROUTES.user(id)}>
        <CardMedia
          component="img"
          height="250"
          image={avatar || "https://picsum.photos/200"}
          alt="avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {firstName} {lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button disabled={disabled} onClick={onDelete} size="small">
            remove
          </Button>
        </CardActions>
      </Link>
    </Card>
  );
}
