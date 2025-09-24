import { useColorScheme, type ColorSchemeName } from 'react-native';
import { useMemo } from 'react';

export type AppTheme = {
  colors: {
    primary: string;
    [key: string]: string;
  };
};

export const makeTheme = (scheme: ColorSchemeName): AppTheme => {
  const isDark = scheme === 'dark';
  return {
    colors: {
      primary: '#338DFF',
      textInput: isDark ? '#f4f4f5' : '#111827',
      textInputBorder: isDark ? '#52525b' : '#d4d4d8',
      textInputPlaceholder: isDark ? '#a1a1aa' : '#6b7280',
    },
  };
};

export default function useTheme(): AppTheme {
  const scheme = useColorScheme();
  return useMemo(() => makeTheme(scheme), [scheme]);
}
