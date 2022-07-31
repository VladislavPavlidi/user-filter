/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-cycle */
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";
import { useAppDispatch } from "../../App/hooks";
import { removeUser } from "../../Features/Users/usersSlice";

export interface IUserCard {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export default function UserCard({
  id,
  email,
  first_name: firstName,
  last_name: lastName,
  avatar,
}: IUserCard) {
  const dispatch = useAppDispatch();
  function onDelete(event: any) {
    event.preventDefault();
    dispatch(removeUser(id));
  }

  return (
    <Card sx={{ width: 345 }}>
      <Link to={ROUTES.user(id)}>
        <CardMedia component="img" height="250" image={avatar} alt="avatar" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {firstName} {lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onDelete} size="small">
            remove
          </Button>
        </CardActions>
      </Link>
    </Card>
  );
}
