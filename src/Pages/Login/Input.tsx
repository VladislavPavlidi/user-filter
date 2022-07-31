import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

interface IInput {
    name: string;
    label: string;
    type?: string;
    required?: boolean
}

export default function Input({ name, label, type = 'text', required }: IInput) {
    const { control } = useFormContext();
  return (
    <Controller
            control={control}
            name={name}
            rules={{
              required,
            }}
            render={({ field }) => (
              <TextField
                // helperText={errors.email?.message}
                label={label}
                type={type}
                fullWidth
                inputRef={field.ref}
                onChange={field.onChange}
                name={field.name}
                // error={errors.email}
                margin="dense"
              />
            )}
          />
  )
}
