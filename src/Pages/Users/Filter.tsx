import { Button, Grid, Container } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../Login/Input";

export interface IFilterValues {
  first_name: string;
  last_name: string;
  email: string;
}

export default function Filter() {
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const { handleSubmit } = methods;

  function onSubmit(values: any) {
    console.log(values);
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
