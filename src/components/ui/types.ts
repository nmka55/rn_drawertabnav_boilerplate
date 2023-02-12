import {
  CheckboxProps,
  DateTimePickerProps,
  TextFieldProps as TFP,
} from 'react-native-ui-lib';

export interface BasePropType {
  name: string;
  rules?: object;
  defaultValue?: string;
  [x: string]: any;
}

export type CheckboxPropType = BasePropType & CheckboxProps;

export type DatePickerProps = BasePropType & DateTimePickerProps;

export type TextFieldProps = BasePropType & TFP;

export interface PickerPropType extends BasePropType {
  optionList: PickerItemType[];
}

export interface PickerItemType {
  id: string;
  [x: string]: string;
}

export interface PickerSelectedItemType {
  value: string;
  [x: string]: string;
}
