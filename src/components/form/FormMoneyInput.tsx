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

export type FormMoneyInputProps<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
> = Omit<
  AppTextFieldProps,
  'inputMode' | 'keyboardType' | 'onBlur' | 'onChangeText' | 'value'
> &
  FormControllerProps<Values, Name>;

/**
 * A whole-money input that stores only digits (for example, `125000`) while
 * displaying grouped thousands (for example, `125,000`).
 */
function formatThousands(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function normalizeDigits(value: string): string {
  return value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
}

export function FormMoneyInput<
  Values extends FieldValues,
  Name extends FieldPath<Values>,
>({
  control,
  name,
  ...props
}: FormMoneyInputProps<Values, Name>): React.JSX.Element {
  const { field, fieldState } = useController({ control, name });
  const rawValue = typeof field.value === 'string' ? field.value : '';

  return (
    <AppTextField
      {...props}
      inputMode="numeric"
      keyboardType="number-pad"
      value={formatThousands(rawValue)}
      onBlur={field.onBlur}
      onChangeText={value => field.onChange(normalizeDigits(value))}
      errorMessage={fieldState.error?.message}
    />
  );
}
