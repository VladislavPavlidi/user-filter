/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { Box, Button, Container, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React, { forwardRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Api from "../../Api";
import { useAppDispatch } from "../../App/hooks";
import { addUser } from "../../Features/Users/usersSlice";
import useGetParams from "../../Hooks/useGetParams";
import Input from "../../Components/Input";

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

type FormValues = {
  email: string;
  first_name: string;
  last_name: string;
};

function ModalContent(
  { setCards, setOpen }: any,
  ref: React.Ref<HTMLDivElement>
) {
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState(null);
  const classes = useStyles();
  const filter = useGetParams();
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (apiError) setApiError(null);
    try {
      const response = await Api.post("https://reqres.in/api/users", values);
      dispatch(addUser(response));
      setCards((prev: any) =>
        [...prev, response].filter((user: any) =>
          Object.entries(filter).every(([key, value]: any) =>
            // user[key].toLowerCase().include(value.toLowerCase()) // second filter option
            user[key].toLowerCase().startsWith(value.toLowerCase())
          )
        )
      );
      setOpen(false);
    } catch (error: any) {
      if (error?.data?.error) setApiError(error?.data?.error);
    }
  };

  return (
    <Box ref={ref} className={classes.modal}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Создать пользователя
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container maxWidth="xs">
            <Input required name="first_name" label="Имя" />
            <Input required name="last_name" label="Фамилия" />
            <Input required type="email" name="email" label="Email" />
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
