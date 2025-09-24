import React, { useMemo } from 'react';

import { Button } from 'react-native';
import { HomeTabBStackParamList } from '@app/navigators/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '@app/constants';
import { useNavigation } from '@react-navigation/native';
import useTheme from '@app/constants/Theme';

export default function TabB(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabBStackParamList>>();

  const theme = useTheme();
  const GlobalStyles = useMemo(() => createGlobalStyles(theme), [theme]);

  return (
    <SafeAreaView style={GlobalStyles.containerBase}>
      <Button
        onPress={() => navigation?.navigate('TabBDetails')}
        title="Go to Tab B Details"
      />
    </SafeAreaView>
  );
}
