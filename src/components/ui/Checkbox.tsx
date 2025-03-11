import React from 'react';
import {StyleSheet} from 'react-native';
import {Checkbox, Colors} from 'react-native-ui-lib';
import {useController} from 'react-hook-form';
import {CheckboxPropType} from './types';

const CustomCheckbox = ({
  name,
  rules,
  defaultValue,
  ...restOfProps
}: CheckboxPropType): React.JSX.Element => {
  const {
    field: {value, onChange},
  } = useController({name, rules, defaultValue});

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 10,
    },
    label: {
      marginLeft: 8,
      fontSize: 13,
      color: Colors.$textDefault,
    },
  });

  return (
    <Checkbox
      {...restOfProps}
      labelStyle={[styles.label, restOfProps.labelStyle]}
      containerStyle={[styles.container, restOfProps.containerStyle]}
      color={Colors.$iconPrimaryLight}
      iconColor="white"
      value={value}
      onValueChange={onChange}
    />
  );
};

export default CustomCheckbox;
