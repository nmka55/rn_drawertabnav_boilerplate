import type { AppTheme } from '@constants/Theme';
import { StyleSheet } from 'react-native';

export const createGlobalStyles = (theme: AppTheme) =>
  StyleSheet.create({
    containerBase: {
      flex: 1,
      padding: 16,
    },
    textInputContainer: {
      width: '100%',
      rowGap: 8,
      marginVertical: 8,
      paddingVertical: 8,
    },
    textInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      borderWidth: 1,
      borderColor: theme.colors.textInputBorder,
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: 'transparent',
    },
    textInputRowWithError: {
      borderColor: 'red',
    },
    fieldError: {
      color: 'red',
    },
    textInput: {
      flex: 1,
      height: 40,
      color: theme.colors.textInput,
    },
  });
