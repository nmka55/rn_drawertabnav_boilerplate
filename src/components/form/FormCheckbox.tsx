import React from 'react';
import {
  useController,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  AppCheckbox,
  type AppCheckboxProps,
} from '@app/components/ui/AppCheckbox';
import type { FormControllerProps } from '@app/components/form/types';

export type FormCheckboxProps<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
> = Omit<AppCheckboxProps, 'value' | 'onValueChange' | 'errorMessage'> &
  FormControllerProps<Values, Name>;

/** Binds `AppCheckbox` to a boolean field. Validation remains in the form schema. */
export function FormCheckbox<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
>({
  control,
  name,
  ...props
}: FormCheckboxProps<Values, Name>): React.JSX.Element {
  const { field, fieldState } = useController({ control, name });

  return (
    <AppCheckbox
      {...props}
      value={Boolean(field.value)}
      onValueChange={field.onChange}
      errorMessage={fieldState.error?.message}
    />
  );
}
