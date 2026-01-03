'use client'

import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { Field, FieldError, FieldLabel } from './field'

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName> & {
  label?: string
  labelClassName?: string
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  labelClassName,
  render,
  ...props
}: FormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      {...props}
      render={(fieldProps) => {
        const { field, fieldState } = fieldProps
        const error = fieldState.error

        return (
          <Field>
            {label && (
              <FieldLabel className={labelClassName}>{label}</FieldLabel>
            )}
            {render({
              ...fieldProps,
              field: {
                ...field,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e)
                },
              },
            })}
            {error && <FieldError errors={[{ message: error.message }]} />}
          </Field>
        )
      }}
    />
  )
}
