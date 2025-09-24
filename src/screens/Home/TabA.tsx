import { Button, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HomeTabAStackParamList } from '@app/navigators/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StoreRootState } from '@app/redux/store';
import { createGlobalStyles } from '@app/constants/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import useTheme from '@app/constants/Theme';
import { userLogout } from '@app/redux/actions';

const TabA = (): React.JSX.Element => {
  const userData = useSelector((s: StoreRootState) => s.user?.userData ?? {});
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabAStackParamList>>();

  const theme = useTheme();
  const GlobalStyles = useMemo(() => createGlobalStyles(theme), [theme]);

  const onLogoutPress = () => dispatch(userLogout());

  return (
    <SafeAreaView style={[GlobalStyles.containerBase, styles.centerContent]}>
      <Button
        onPress={() => navigation.navigate('TabADetails')}
        title={`Hello, ${userData.username ?? ''}. Go to User Details`}
      />
      <Button onPress={onLogoutPress} title="Logout" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
  },
});

export default TabA;
