import React from 'react';
import {TextField} from 'react-native-ui-lib';
import {TextFieldProps} from './types';
import {GlobalStyles} from '@app/constants';
import {useController} from 'react-hook-form';

const CustomTextField = ({
  name,
  rules,
  defaultValue,
  trailingAccessory,
  showTrailingAccessoryAlways = false,
  ...restOfProps
}: TextFieldProps): React.JSX.Element => {
  const {
    field: {value, onChange, onBlur},
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  const hasError = Boolean(error);
  const trailingAccessoryElement =
    value?.length > 0 || showTrailingAccessoryAlways
      ? trailingAccessory
      : undefined;

  return (
    <TextField
      {...restOfProps}
      // TextField Props
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
      validationMessage={hasError ? error?.message ?? '' : undefined} // Safeguard for undefined error
      trailingAccessory={trailingAccessoryElement}
      // Value Props
      onChangeText={onChange}
      value={value}
      onBlur={onBlur}
    />
  );
};

export default CustomTextField;
