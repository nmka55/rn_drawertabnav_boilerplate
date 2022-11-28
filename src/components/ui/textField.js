import {Incubator} from 'react-native-ui-lib';
import React from 'react';
import {StyleSheet} from 'react-native';
import globalStyles from '@app/constants/globalStyles';
import {useController} from 'react-hook-form';

const {TextField} = Incubator;

export default props => {
  const {
    name,
    rules,
    defaultValue,
    trailingAccessory,
    showTrailingAccessoryAlways = false,
  } = props;

  const {
    field,
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  const hasError = Boolean(error);

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
      validationMessage={hasError ? error?.message : undefined}
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
