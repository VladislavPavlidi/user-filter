/* eslint-disable import/no-cycle */
import { Button, Grid, Container } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { selectUserFilter, setUserFilter } from "../../Features/UserFilter";
// import { filterUsers } from "../../Features/Users/usersSlice";

import Input from "../Login/Input";

export interface IFilterValues {
  first_name: string;
  last_name: string;
  email: string;
}

export default function Filter() {
  const filterParameters = useAppSelector(selectUserFilter);
  const dispatch = useAppDispatch();
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  useEffect(() => {
    console.log(filterParameters, "filterParameters");
  }, [filterParameters]);

  const { handleSubmit } = methods;

  function onSubmit(values: IFilterValues) {
    dispatch(setUserFilter(values));
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container
          sx={{
            marginBottom: 5,
          }}
        >
          <Grid container direction="row" gap={5}>
            <Grid item sx={{ width: 345 }}>
              <Input name="first_name" label="name" />
            </Grid>
            <Grid item sx={{ width: 345 }}>
              <Input name="last_name" label="last name" />
            </Grid>
            <Grid item sx={{ width: 345 }}>
              <Input name="email" label="email" />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Применить фильтр
          </Button>
        </Container>
      </form>
    </FormProvider>
  );
}
