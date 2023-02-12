import {Incubator, Picker} from 'react-native-ui-lib';
import {PickerItemType, PickerPropType, PickerSelectedItemType} from './types';

import React from 'react';
import {StyleSheet} from 'react-native';
import {globalStyles} from '@app/constants';
import {useController} from 'react-hook-form';

export default (props: PickerPropType): JSX.Element => {
  const {
    name,
    rules,
    defaultValue,
    optionList = [],
    labelProperty = 'id',
  } = props;

  const {
    field,
    fieldState: {error},
  } = useController({name, rules, defaultValue});

  const hasError = Boolean(error);

  const styles = StyleSheet.flatten([globalStyles]);

  const RenderOptions = () => {
    return optionList?.map((item: PickerItemType, index: number) => {
      return (
        <Picker.Item key={index} value={item?.id} label={item[labelProperty]} />
      );
    });
  };

  return (
    <Picker
      {...props}
      //Picker props
      mode="SINGLE"
      topBarProps={{title: props?.placeholder}}
      // TextField props
      migrateTextField
      floatOnFocus={true}
      floatingPlaceholder={true}
      label={props?.label ?? props?.placeholder}
      labelColor="black"
      color="black"
      enableErrors={hasError}
      validationMessagePosition={
        Incubator.TextField.validationMessagePositions.TOP
      }
      validationMessage={hasError ? error?.message : undefined}
      containerStyle={[styles?.textFieldContainer, props?.containerStyle]}
      fieldStyle={[styles?.textField, props?.fieldStyle]}
      //Value props
      onChange={(item: PickerSelectedItemType) => field.onChange(item?.value)}
      value={field.value}
      defaultValue={field.value}>
      {RenderOptions()}
    </Picker>
  );
};
