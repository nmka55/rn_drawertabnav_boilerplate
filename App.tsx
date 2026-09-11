/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { AppProviders } from '@app/app/AppProviders';

export default function App(): React.JSX.Element {
  const isDark = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <GestureHandlerRootView style={styles.root}>
        <AppProviders />
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
