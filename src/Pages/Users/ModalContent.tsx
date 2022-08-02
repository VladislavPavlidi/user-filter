/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { Box, Button, Container, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
// import React, { useState } from "react";
import React, { forwardRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../Login/Input";
import Api from "../../Api";

const useStyles = makeStyles(() => ({
  modal: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    padding: 50,
    backgroundColor: "#fff",
  },
}));

function ModalContent(
  { setCards, setOpen }: any,
  ref: React.Ref<HTMLDivElement>
) {
  const [apiError, setApiError] = useState(null);
  const classes = useStyles();
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  async function onSubmit(values: any) {
    if (apiError) setApiError(null);
    try {
      const response = await Api.post("https://reqres.in/api/users", values);
      setCards((prev: any) => [...prev, response]);
      setOpen(false);
    } catch (error: any) {
      if (error?.data?.error) setApiError(error?.data?.error);
    }
  }

  return (
    <Box ref={ref} className={classes.modal}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container maxWidth="xs">
            <Input name="avatar" label="Avatar (url)" />
            <Input name="first_name" label="Имя" />
            <Input name="last_name" label="Фамилия" />
            <Input name="email" label="Email" />
            <Button
              type="submit"
              disabled={isValid && isSubmitting}
              variant="contained"
              color="primary"
            >
              создать
            </Button>
            {apiError && <p style={{ color: "red" }}>{apiError}</p>}
          </Container>
        </form>
      </FormProvider>
    </Box>
  );
}

export default forwardRef(ModalContent);
