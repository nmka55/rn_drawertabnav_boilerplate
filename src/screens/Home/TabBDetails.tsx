import React, { useMemo } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { createGlobalStyles } from '@app/constants';
import useTheme from '@app/constants/Theme';

export default function TabBDetails(): React.JSX.Element {
  const theme = useTheme();
  const GlobalStyles = useMemo(() => createGlobalStyles(theme), [theme]);

  return (
    <SafeAreaView style={GlobalStyles.containerBase}>
      <Text>Tab B Details</Text>
    </SafeAreaView>
  );
}
