import React from 'react';
import { Button, type ButtonProps } from 'react-native-paper';

export type AppButtonProps = ButtonProps;

/** The shared Paper button export, kept here so screens have one stable import path. */
export function AppButton(props: AppButtonProps): React.JSX.Element {
  return <Button mode="contained" {...props} />;
}
