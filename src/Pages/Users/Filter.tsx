/* eslint-disable import/no-cycle */
import { Button, Grid, Container, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { selectUserFilter, setUserFilter } from "../../Features/UserFilter";
import ROUTES from "../../routes";
import { toString } from "../../Utilities/params";

import Input from "../Login/Input";
import ModalContent from "./ModalContent";

export interface IFilterValues {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export default function Filter() {
  const filterParameters = useAppSelector(selectUserFilter);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const firstMount = useRef(true);
  const navigate = useNavigate();
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: Object.fromEntries(searchParams) as unknown as IFilterValues,
  });

  useEffect(() => {
    if (!firstMount.current) {
      navigate(`${ROUTES.users()}${toString(filterParameters)}`, {
        replace: true,
      });
    }
  }, [filterParameters]);

  const { handleSubmit } = methods;

  function onSubmit(values: IFilterValues) {
    dispatch(setUserFilter(values));
  }

  useEffect(() => {
    firstMount.current = false;
  }, []);

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
          <Grid mt={2} container direction="row" gap={5}>
            <Button type="submit" variant="contained" color="primary">
              Применить фильтр
            </Button>
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              color="primary"
            >
              Добавить пользователя
            </Button>
          </Grid>
        </Container>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalContent />
        </Modal>
      </form>
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
