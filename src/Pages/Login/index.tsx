import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { FormProvider, useForm } from 'react-hook-form';
import Input from './Input';
import Api from '../../Api';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes';

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  async function onSubmit(values: any) {
    if (error) setError(null);
    try {
      const response = await Api.get('https://reqres.in/api/login', values);
      navigate(ROUTES.profile());
    } catch (error: any) {
      if (error?.data?.error) setError(error?.data?.error);
    }
  }

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
    {error && <p style={{ color: 'red'}}>{error}</p>}
    </Container>
    </form>
    </FormProvider>
  )
}
