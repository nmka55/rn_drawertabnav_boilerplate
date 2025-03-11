import React from 'react';
import {DateTimePicker, TextField} from 'react-native-ui-lib';
import {useColorScheme} from 'react-native';
import {useController} from 'react-hook-form';
import {GlobalStyles} from '@app/constants';
import {DatePickerProps} from './types';

const CustomDatePicker = ({
  name,
  rules,
  defaultValue,
  ...restOfProps
}: DatePickerProps): React.JSX.Element => {
  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  const hasError = Boolean(error);
  const currentColorScheme = useColorScheme() ?? 'light';

  return (
    <DateTimePicker
      {...restOfProps}
      themeVariant={currentColorScheme}
      // Date props
      is24Hour
      locale="mn"
      minimumDate={new Date(1970, 0)}
      // TextField props
      label={restOfProps.label ?? restOfProps.placeholder}
      floatOnFocus
      floatingPlaceholder
      containerStyle={[
        GlobalStyles.textFieldContainer,
        restOfProps.containerStyle,
      ]}
      fieldStyle={[GlobalStyles.textField, restOfProps.fieldStyle]}
      enableErrors={hasError}
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={hasError ? error?.message : undefined}
      // Value props
      onChange={(date: Date) => onChange(date?.toISOString() ?? null)}
      value={value ? new Date(value) : undefined}
    />
  );
};

export default CustomDatePicker;
