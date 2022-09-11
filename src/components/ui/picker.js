import {Picker, Incubator, Colors, View} from 'react-native-ui-lib';
import {useController, useFormContext} from 'react-hook-form';

import React from 'react';
import {StyleSheet} from 'react-native';
import globalStyles from '@app/constants/globalStyles';

const {TextField} = Incubator;

export default props => {
  const {name, rules, defaultValue, optionList = []} = props;

  const {formState} = useFormContext();
  const {field} = useController({name, rules, defaultValue});

  const hasError = Boolean(formState?.errors[name]);

  const styles = StyleSheet.flatten([globalStyles, {}]);

  const RenderOptions = () => {
    const labelProperty = props?.labelProperty ?? 'id';

    return optionList?.map((item, index) => {
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
      validationMessagePosition={TextField.validationMessagePositions.TOP}
      validationMessage={
        hasError ? formState?.errors[name]?.message : undefined
      }
      containerStyle={[styles.textFieldContainer, props?.containerStyle]}
      fieldStyle={[styles.textField, props?.fieldStyle]}
      //Value props
      onChange={item => field.onChange(item?.value)}
      value={field.value}
      defaultValue={field.value}>
      {RenderOptions()}
    </Picker>
  );
};
