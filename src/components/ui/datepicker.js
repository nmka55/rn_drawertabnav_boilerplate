import {Colors, DateTimePicker, Incubator} from 'react-native-ui-lib';
import * as constants from '@app/constants';
import globalStyles from '@app/constants/globalStyles';
import {useController, useFormContext} from 'react-hook-form';

import React from 'react';
import {StyleSheet} from 'react-native';

const {TextField} = Incubator;

export default props => {
  const {name, rules, defaultValue} = props;

  const {formState} = useFormContext();
  const {field} = useController({name, rules, defaultValue});

  const hasError = Boolean(formState?.errors[name]);

  const styles = StyleSheet.flatten([
    globalStyles,
    {
      container: {
        width: '100%',
        marginBottom: 10,
        borderRadius: 8,
        paddingTop: hasError ? 8 : 16,
        paddingBottom: 16,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: Colors?.primary + '50',
      },
      field: {},
    },
  ]);

  return (
    <DateTimePicker
      {...props}
      //Date props
      is24Hour={true}
      locale="mn"
      dateFormat={constants.pickerDateFormat}
      timeFormat={constants.pickerTimeFormat}
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
      containerStyle={[styles.textFieldContainer, props?.containerStyle]}
      fieldStyle={[styles.textField, props?.fieldStyle]}
      enableErrors={hasError}
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={
        hasError ? formState?.errors[name]?.message : undefined
      }
      //Value props
      onChange={date => field.onChange(date?.toISOString() ?? null)}
      value={field.value ? new Date(field.value) : null}
    />
  );
};
