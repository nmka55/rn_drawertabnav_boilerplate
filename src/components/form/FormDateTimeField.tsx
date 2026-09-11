import React from 'react';
import {
  useController,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  AppDateTimeField,
  type AppDateTimeFieldProps,
} from '@app/components/ui/AppDateTimeField';
import type { FormControllerProps } from '@app/components/form/types';

export type FormDateTimeFieldProps<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
> = Omit<AppDateTimeFieldProps, 'value' | 'onValueChange' | 'errorMessage'> &
  FormControllerProps<Values, Name>;

/** Binds the native date/time picker field to a `Date | undefined` form value. */
export function FormDateTimeField<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
>({
  control,
  name,
  ...props
}: FormDateTimeFieldProps<Values, Name>): React.JSX.Element {
  const { field, fieldState } = useController({ control, name });

  return (
    <AppDateTimeField
      {...props}
      value={
        (field.value as unknown) instanceof Date
          ? (field.value as Date)
          : undefined
      }
      onValueChange={field.onChange}
      errorMessage={fieldState.error?.message}
    />
  );
}
