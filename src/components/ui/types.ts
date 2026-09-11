/** A value/label pair used by the select and radio controls. */
export type ChoiceOption<Value extends string = string> = {
  label: string;
  value: Value;
  disabled?: boolean;
};
