import React from 'react';
import { View } from 'react-native';
import { HelperText, RadioButton, Text } from 'react-native-paper';
import type { ChoiceOption } from '@app/components/ui/types';

export type AppRadioGroupProps<Value extends string = string> = {
  label?: string;
  value: Value | undefined;
  onValueChange: (value: Value) => void;
  options: readonly ChoiceOption<Value>[];
  disabled?: boolean;
  errorMessage?: string;
  testID?: string;
};

/** A controlled radio group with a typed string union when callers provide one. */
export function AppRadioGroup<Value extends string = string>({
  label,
  value,
  onValueChange,
  options,
  disabled,
  errorMessage,
  testID,
}: AppRadioGroupProps<Value>): React.JSX.Element {
  return (
    <View testID={testID}>
      {label ? <Text variant="labelLarge">{label}</Text> : null}
      <RadioButton.Group
        value={value ?? ''}
        onValueChange={nextValue => onValueChange(nextValue as Value)}
      >
        {options.map(option => (
          <RadioButton.Item
            key={option.value}
            label={option.label}
            value={option.value}
            disabled={disabled || option.disabled}
          />
        ))}
      </RadioButton.Group>
      {errorMessage ? (
        <HelperText type="error">{errorMessage}</HelperText>
      ) : null}
    </View>
  );
}
