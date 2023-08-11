import React from 'react';
import {TextField} from 'react-native-ui-lib';
import {TextFieldProps} from './types';
import {globalStyles as styles} from '@app/constants';
import {useController} from 'react-hook-form';

export default (props: TextFieldProps): JSX.Element => {
  const {
    name,
    rules,
    defaultValue,
    trailingAccessory,
    showTrailingAccessoryAlways = false,
    ...restOfProps
  } = props;

  const {
    field,
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  const hasError: boolean = Boolean(error);

  const trailingAccessoryElement =
    field.value?.length > 0 || showTrailingAccessoryAlways
      ? trailingAccessory
      : undefined;

  return (
    <TextField
      {...restOfProps}
      // TextField Props
      label={props?.label ?? props?.placeholder}
      floatOnFocus={true}
      floatingPlaceholder={true}
      containerStyle={[styles?.textFieldContainer, props?.containerStyle]}
      fieldStyle={[styles?.textField, props?.fieldStyle]}
      enableErrors={hasError}
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={hasError ? error?.message : undefined}
      trailingAccessory={trailingAccessoryElement}
      //Value props
      onChangeText={field.onChange}
      value={field.value}
      onBlur={field.onBlur}
    />
  );
};
