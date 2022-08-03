import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import Api from "../../Api";
import ROUTES from "../../routes";
import { setAuth } from "../../Features/Auth/authSlice";
import { useAppDispatch } from "../../App/hooks";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (apiError) setApiError(null);
    try {
      const { token } = await Api.post("https://reqres.in/api/login", values);
      dispatch(setAuth(token));
      navigate(ROUTES.profile());
    } catch (error: any) {
      if (error?.data?.error) setApiError(error?.data?.error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xs">
          <Input name="email" type="text" label="Email" />
          <Input name="password" type="password" label="Пароль" />
          <Button
            type="submit"
            disabled={isValid && isSubmitting}
            variant="contained"
            color="primary"
          >
            Войти
          </Button>
          {apiError && <p style={{ color: "red" }}>{apiError}</p>}
        </Container>
      </form>
    </FormProvider>
  );
}
