import type {
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import type {
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import type React from 'react';

export type BasePropType<
  TFieldValues extends FieldValues = FieldValues,
> = {
  name: FieldPath<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  defaultValue?: string;

  leadingAccessory?: React.ReactNode;
  trailingAccessory?: React.ReactNode;

  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputProps?: Omit<RNTextInputProps, 'value' | 'onChangeText' | 'onBlur'>;
};

export type TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> = BasePropType<TFieldValues>;
