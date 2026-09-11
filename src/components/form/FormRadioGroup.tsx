import React from 'react';
import {
  useController,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  AppRadioGroup,
  type AppRadioGroupProps,
} from '@app/components/ui/AppRadioGroup';
import type { FormControllerProps } from '@app/components/form/types';

export type FormRadioGroupProps<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
  Value extends string = string,
> = Omit<
  AppRadioGroupProps<Value>,
  'value' | 'onValueChange' | 'errorMessage'
> &
  FormControllerProps<Values, Name>;

/** Binds the reusable radio group to a named string field in a form. */
export function FormRadioGroup<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
  Value extends string = string,
>({
  control,
  name,
  ...props
}: FormRadioGroupProps<Values, Name, Value>): React.JSX.Element {
  const { field, fieldState } = useController({ control, name });

  return (
    <AppRadioGroup
      {...props}
      value={field.value as Value | undefined}
      onValueChange={field.onChange}
      errorMessage={fieldState.error?.message}
    />
  );
}
