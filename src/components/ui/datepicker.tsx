import {Colors, DateTimePicker, Incubator} from 'react-native-ui-lib';
import {constantValues, globalStyles} from '@app/constants';

import {DatePickerProps} from './types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useController} from 'react-hook-form';

export default (props: DatePickerProps): JSX.Element => {
  const {name, rules, defaultValue} = props;

  const {
    field,
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  const hasError: boolean = Boolean(error);

  const styles: any = StyleSheet.flatten([globalStyles]);

  return (
    <DateTimePicker
      {...props}
      //Date props
      is24Hour={true}
      locale="mn"
      dateFormat={constantValues.pickerDateFormat}
      timeFormat={constantValues.pickerTimeFormat}
      minimumDate={new Date(1970, 0)}
      //Dialog props
      headerStyle={{backgroundColor: Colors.mainBg}}
      dialogProps={{
        containerStyle: {backgroundColor: 'white'},
      }}
      themeVariant="light"
      textColor="white"
      //TextField props
      migrateTextField
      label={props?.label ?? props?.placeholder}
      labelColor="black"
      color="black"
      floatOnFocus={true}
      floatingPlaceholder={true}
      containerStyle={[styles?.textFieldContainer, props?.containerStyle]}
      fieldStyle={[styles?.textField, props?.fieldStyle]}
      enableErrors={hasError}
      validationMessagePosition={
        Incubator.TextField.validationMessagePositions.TOP
      }
      validationMessage={hasError ? error?.message : undefined}
      //Value props
      onChange={(date: Date) => field.onChange(date?.toISOString() ?? null)}
      value={field.value ? new Date(field.value) : null}
    />
  );
};
