import React, { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Button, HelperText, TextInput } from 'react-native-paper';

export type DateTimeMode = 'date' | 'time';

export type AppDateTimeFieldProps = {
  label: string;
  mode: DateTimeMode;
  value: Date | undefined;
  onValueChange: (value: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  testID?: string;
};

function displayValue(value: Date | undefined, mode: DateTimeMode): string {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat(undefined, {
    ...(mode === 'date'
      ? { year: 'numeric', month: 'short', day: 'numeric' }
      : { hour: 'numeric', minute: '2-digit' }),
  }).format(value);
}

/**
 * A controlled native date or time field. The native picker preserves expected
 * platform behaviour while the Paper input keeps the surrounding UI uniform.
 */
export function AppDateTimeField({
  label,
  mode,
  value,
  onValueChange,
  placeholder,
  disabled,
  errorMessage,
  testID,
}: AppDateTimeFieldProps): React.JSX.Element {
  const [pickerVisible, setPickerVisible] = useState(false);
  const pickerValue = value ?? new Date();

  const onChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS !== 'ios') {
      setPickerVisible(false);
    }
    if (selected) {
      onValueChange(selected);
    }
  };

  return (
    <View>
      <Pressable
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        testID={testID}
        onPress={() => setPickerVisible(true)}
      >
        <View pointerEvents="none">
          <TextInput
            label={label}
            value={displayValue(value, mode)}
            placeholder={
              placeholder ??
              (mode === 'date' ? 'Choose a date' : 'Choose a time')
            }
            editable={false}
            error={Boolean(errorMessage)}
            disabled={disabled}
            right={
              <TextInput.Icon
                icon={mode === 'date' ? 'calendar' : 'clock-outline'}
              />
            }
          />
        </View>
      </Pressable>
      {pickerVisible ? (
        <View>
          <DateTimePicker
            value={pickerValue}
            mode={mode}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
          />
          {Platform.OS === 'ios' ? (
            <Button onPress={() => setPickerVisible(false)}>Done</Button>
          ) : null}
        </View>
      ) : null}
      {errorMessage ? (
        <HelperText type="error">{errorMessage}</HelperText>
      ) : null}
    </View>
  );
}
