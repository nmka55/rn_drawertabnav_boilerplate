import React from 'react';
import {
  useController,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  AppTextField,
  type AppTextFieldProps,
} from '@app/components/ui/AppTextField';
import type { FormControllerProps } from '@app/components/form/types';

export type FormTextFieldProps<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
> = Omit<
  AppTextFieldProps,
  'value' | 'onChangeText' | 'onBlur' | 'errorMessage'
> &
  FormControllerProps<Values, Name>;

/** Binds `AppTextField` to one named field in an explicit React Hook Form control. */
export function FormTextField<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
>({
  control,
  name,
  ...props
}: FormTextFieldProps<Values, Name>): React.JSX.Element {
  const { field, fieldState } = useController({ control, name });

  return (
    <AppTextField
      {...props}
      value={typeof field.value === 'string' ? field.value : ''}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      errorMessage={fieldState.error?.message}
    />
  );
}
