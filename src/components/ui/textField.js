import {Colors, Incubator, View} from 'react-native-ui-lib';
import {useController, useFormContext} from 'react-hook-form';

import React from 'react';
import {StyleSheet} from 'react-native';
import globalStyles from '@app/constants/globalStyles';

const {TextField} = Incubator;

export default props => {
  const {
    name,
    rules,
    defaultValue,
    trailingAccessory,
    showTrailingAccessoryAlways = false,
  } = props;

  const {formState} = useFormContext();
  const {field} = useController({name, rules, defaultValue});

  const hasError = Boolean(formState?.errors[name]);

  const styles = StyleSheet.flatten([globalStyles, {}]);

  return (
    <TextField
      {...props}
      // TextField Props
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
      trailingAccessory={
        field.value?.length > 0 || showTrailingAccessoryAlways
          ? trailingAccessory
          : undefined
      }
      //Value props
      onChangeText={field.onChange}
      value={field.value}
      onBlur={field.onBlur}
    />
  );
};
