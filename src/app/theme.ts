import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

/** The single visual token source for Paper controls and React Navigation. */
export const makeTheme = (dark: boolean): MD3Theme => {
  const base = dark ? MD3DarkTheme : MD3LightTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: dark ? '#A8C7FF' : '#005DBA',
      onPrimary: dark ? '#00315C' : '#FFFFFF',
      primaryContainer: dark ? '#004A77' : '#D7E3FF',
      onPrimaryContainer: dark ? '#D7E3FF' : '#001B3E',
      secondary: dark ? '#ADC6FF' : '#345EA8',
      onSecondary: dark ? '#17315F' : '#FFFFFF',
      error: '#BA1A1A',
    },
  };
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
