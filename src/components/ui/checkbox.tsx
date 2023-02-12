import {Checkbox, Colors} from 'react-native-ui-lib';

import {CheckboxPropType} from './types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {globalStyles} from '@app/constants';
import {useController} from 'react-hook-form';

export default (props: CheckboxPropType): JSX.Element => {
  const {name, rules, defaultValue} = props;
  const {field} = useController({name, rules, defaultValue});

  const styles: any = StyleSheet.flatten([
    globalStyles,
    StyleSheet.create({
      container: {
        width: '100%',
        marginVertical: 10,
      },
      label: {marginLeft: 8, fontSize: 13},
    }),
  ]);

  return (
    <Checkbox
      {...props}
      labelStyle={[styles?.label, props?.labelStyle]}
      containerStyle={[styles?.container, props?.containerStyle]}
      color={Colors.primary}
      iconColor={'white'}
      value={field.value}
      onValueChange={field.onChange}
    />
  );
};
