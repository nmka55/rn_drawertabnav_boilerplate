import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { HelperText, Menu, TextInput } from 'react-native-paper';
import type { ChoiceOption } from '@app/components/ui/types';

export type AppSelectProps<Value extends string = string> = {
  label: string;
  value: Value | undefined;
  onValueChange: (value: Value) => void;
  options: readonly ChoiceOption<Value>[];
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  testID?: string;
};

/**
 * A Paper-styled select. It uses a `Menu`, so its visual language follows the
 * app theme without adding another picker dependency.
 */
export function AppSelect<Value extends string = string>({
  label,
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  disabled,
  errorMessage,
  testID,
}: AppSelectProps<Value>): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const selected = options.find(option => option.value === value);

  const anchor = (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      testID={testID}
      onPress={() => setVisible(true)}
    >
      <View pointerEvents="none">
        <TextInput
          label={label}
          value={selected?.label ?? ''}
          placeholder={placeholder}
          editable={false}
          error={Boolean(errorMessage)}
          disabled={disabled}
          right={<TextInput.Icon icon="chevron-down" />}
        />
      </View>
    </Pressable>
  );

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={anchor}
        contentStyle={styles.menu}
      >
        {options.map(option => (
          <Menu.Item
            key={option.value}
            title={option.label}
            disabled={option.disabled || disabled}
            onPress={() => {
              onValueChange(option.value);
              setVisible(false);
            }}
          />
        ))}
      </Menu>
      {errorMessage ? (
        <HelperText type="error">{errorMessage}</HelperText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    minWidth: 220,
  },
});
