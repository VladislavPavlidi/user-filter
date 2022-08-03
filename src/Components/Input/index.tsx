import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

interface IInput {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

export default function Input({
  name,
  label,
  type = "text",
  required,
}: IInput) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? "Обязательное поле" : false,
      }}
      render={({ field, fieldState }) => (
        <>
          <TextField
            label={label}
            type={type}
            ref={field.ref}
            fullWidth
            defaultValue={field.value}
            onChange={field.onChange}
            name={field.name}
            margin="dense"
          />
          {fieldState?.error && (
            <p style={{ color: "red", margin: "5px 0" }}>
              {fieldState?.error?.message}
            </p>
          )}
        </>
      )}
    />
  );
}
