import {DateTimePicker, TextField} from 'react-native-ui-lib';
import {constantValues, globalStyles as styles} from '@app/constants';

import {DatePickerProps} from './types';
import React from 'react';
import {useColorScheme} from 'react-native';
import {useController} from 'react-hook-form';

export default (props: DatePickerProps): JSX.Element => {
  const {name, rules, defaultValue, ...restOfProps} = props;

  const {
    field,
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  const hasError: boolean = Boolean(error);

  const currentColorScheme = useColorScheme();

  return (
    <DateTimePicker
      {...restOfProps}
      themeVariant={currentColorScheme?.toUpperCase()}
      //Date props
      is24Hour={true}
      locale="mn"
      dateFormat={constantValues.pickerDateFormat}
      timeFormat={constantValues.pickerTimeFormat}
      minimumDate={new Date(1970, 0)}
      //TextField props
      label={props?.label ?? props?.placeholder}
      floatOnFocus={true}
      floatingPlaceholder={true}
      containerStyle={[styles?.textFieldContainer, props?.containerStyle]}
      fieldStyle={[styles?.textField, props?.fieldStyle]}
      enableErrors={hasError}
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={hasError ? error?.message : undefined}
      //Value props
      onChange={(date: Date) => field.onChange(date?.toISOString() ?? null)}
      value={field.value ? new Date(field.value) : null}
    />
  );
};
