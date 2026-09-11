import React from 'react';
import { HelperText, TextInput, type TextInputProps } from 'react-native-paper';

export type AppTextFieldProps = Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'error'
> & {
  /** Controlled text value. Keep state ownership with the screen or form. */
  value: string;
  onChangeText: (value: string) => void;
  errorMessage?: string;
};

/**
 * The standard controlled text field.
 *
 * It accepts normal Paper props and has no form-library dependency. Use the
 * adapter in `components/form` when the value is owned by React Hook Form.
 */
export function AppTextField({
  errorMessage,
  ...props
}: AppTextFieldProps): React.JSX.Element {
  return (
    <>
      <TextInput {...props} error={Boolean(errorMessage)} />
      {errorMessage ? (
        <HelperText type="error">{errorMessage}</HelperText>
      ) : null}
    </>
  );
}
