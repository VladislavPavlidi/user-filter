import React from "react";
import Grid from "@mui/material/Grid";
import UserCard from "./Card";

export default function Users() {
  return (
    <Grid container spacing={2} gap={5} justifyContent="center">
      <UserCard />
      <UserCard />
      <UserCard />
    </Grid>
  );
}
