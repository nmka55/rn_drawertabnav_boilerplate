import React from 'react';
import {Picker, PickerModes, TextField} from 'react-native-ui-lib';
import {useController} from 'react-hook-form';
import {GlobalStyles} from '@app/constants';
import {PickerItemType, PickerPropType} from './types';

const CustomPicker = ({
  name,
  rules,
  defaultValue,
  optionList = [],
  labelProperty = 'id',
  ...restOfProps
}: PickerPropType): React.JSX.Element => {
  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  const hasError = Boolean(error);

  return (
    <Picker
      {...restOfProps}
      mode={PickerModes.SINGLE}
      topBarProps={{title: restOfProps.placeholder}}
      floatOnFocus
      floatingPlaceholder
      label={restOfProps.label ?? restOfProps.placeholder}
      enableErrors={hasError}
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={hasError ? error?.message : undefined}
      containerStyle={[
        GlobalStyles.textFieldContainer,
        restOfProps.containerStyle,
      ]}
      fieldStyle={[GlobalStyles.textField, restOfProps.fieldStyle]}
      onChange={onChange}
      value={value}
      defaultValue={value}>
      {optionList.map((item: PickerItemType, index: number) => (
        <Picker.Item key={index} value={item.id} label={item[labelProperty]} />
      ))}
    </Picker>
  );
};

export default CustomPicker;
