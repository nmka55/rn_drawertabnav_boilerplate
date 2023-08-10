import {Picker, TextField} from 'react-native-ui-lib';
import {PickerItemType, PickerPropType} from './types';

import React from 'react';
import {globalStyles as styles} from '@app/constants';
import {useController} from 'react-hook-form';

export default (props: PickerPropType): JSX.Element => {
  const {
    name,
    rules,
    defaultValue,
    optionList = [],
    labelProperty = 'id',
    ...restOfProps
  } = props;

  const {
    field,
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  const hasError: boolean = Boolean(error);

  const RenderOptions = () => {
    return optionList?.map((item: PickerItemType, index: number) => {
      return (
        <Picker.Item key={index} value={item?.id} label={item[labelProperty]} />
      );
    });
  };

  return (
    <Picker
      {...restOfProps}
      //Picker props
      mode="SINGLE"
      topBarProps={{title: props?.placeholder}}
      // TextField props
      floatOnFocus={true}
      floatingPlaceholder={true}
      label={props?.label ?? props?.placeholder}
      enableErrors={hasError}
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={hasError ? error?.message : undefined}
      containerStyle={[styles?.textFieldContainer, props?.containerStyle]}
      fieldStyle={[styles?.textField, props?.fieldStyle]}
      //Value props
      onChange={field.onChange}
      value={field.value}
      defaultValue={field.value}>
      {RenderOptions()}
    </Picker>
  );
};
