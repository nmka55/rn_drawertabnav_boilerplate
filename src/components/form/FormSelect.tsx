import React from 'react';
import {
  useController,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { AppSelect, type AppSelectProps } from '@app/components/ui/AppSelect';
import type { FormControllerProps } from '@app/components/form/types';

export type FormSelectProps<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
  Value extends string = string,
> = Omit<AppSelectProps<Value>, 'value' | 'onValueChange' | 'errorMessage'> &
  FormControllerProps<Values, Name>;

/** Binds the Paper menu select to a named string field in a form. */
export function FormSelect<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
  Value extends string = string,
>({
  control,
  name,
  ...props
}: FormSelectProps<Values, Name, Value>): React.JSX.Element {
  const { field, fieldState } = useController({ control, name });

  return (
    <AppSelect
      {...props}
      value={field.value as Value | undefined}
      onValueChange={field.onChange}
      errorMessage={fieldState.error?.message}
    />
  );
}
