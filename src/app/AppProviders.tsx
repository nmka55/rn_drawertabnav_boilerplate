import React, { useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { bootstrapAuth } from '@app/features/auth/authSlice';
import { RootNavigator } from '@app/navigation/RootNavigator';
import { store } from '@app/store';
import { makeTheme } from '@app/app/theme';

function Bootstrap(): React.JSX.Element {
  const dispatch = store.dispatch;
  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);
  return <RootNavigator />;
}

/** App-wide providers stay here so screens never arrange global infrastructure. */
export function AppProviders(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => makeTheme(colorScheme === 'dark'), [colorScheme]);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Bootstrap />
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
