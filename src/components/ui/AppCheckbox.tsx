import React from 'react';
import { Checkbox, HelperText } from 'react-native-paper';

export type AppCheckboxProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  errorMessage?: string;
  testID?: string;
};

/** A controlled checkbox that works independently from any form library. */
export function AppCheckbox({
  label,
  value,
  onValueChange,
  disabled,
  errorMessage,
  testID,
}: AppCheckboxProps): React.JSX.Element {
  return (
    <>
      <Checkbox.Item
        label={label}
        status={value ? 'checked' : 'unchecked'}
        onPress={() => onValueChange(!value)}
        disabled={disabled}
        testID={testID}
      />
      {errorMessage ? (
        <HelperText type="error">{errorMessage}</HelperText>
      ) : null}
    </>
  );
}
