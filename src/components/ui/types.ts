export interface BasePropType {
  name: string;
  rules?: object;
  defaultValue?: string;
  leadingAccessory?: React.JSX.Element;
  trailingAccessory?: React.JSX.Element;
  containerStyle?: object;
  [x: string]: any;
}

export type TextFieldProps = BasePropType;
