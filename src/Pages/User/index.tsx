import { Avatar, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api";
import { IUserCard } from "../Users/Card";

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState<IUserCard | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await Api.get(`https://reqres.in/api/users/${id}`);
        setUser(response?.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <Grid
      sx={{ flexDirection: "column" }}
      container
      gap={5}
      alignItems="center"
    >
      {user ? (
        <>
          <Avatar
            alt="avatar"
            src={user?.avatar}
            sx={{ width: 100, height: 100 }}
          />
          <Typography gutterBottom variant="h5" component="div">
            {user?.first_name} {user?.last_name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {user?.email}
          </Typography>
        </>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
}
