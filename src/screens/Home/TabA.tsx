import React from 'react';
import {Button, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {userLogout} from '@app/redux/actions';
import {HomeTabAStackParamList} from '@app/navigators/types';
import {StoreRootState} from '@app/redux/store';
import {GlobalStyles} from '@app/constants';

const TabA = (): React.JSX.Element => {
  const userData = useSelector(
    (state: StoreRootState) => state.user?.userData ?? {},
  );

  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabAStackParamList>>();

  const onLogoutPress = () => {
    dispatch(userLogout());
  };

  return (
    <View style={styles.containerBase}>
      <Button
        onPress={() => navigation.navigate('TabADetails')}
        label={`Hello, ${userData.username ?? ''}. Go to User Details`}
      />
      <Button link marginT-16 onPress={onLogoutPress} label="Logout" />
    </View>
  );
};

const styles = StyleSheet.flatten([
  GlobalStyles,
  {
    containerBase: {
      padding: 16,
      flex: 1,
      justifyContent: 'center',
    },
  },
]) as StyleSheet.NamedStyles<any>;

export default TabA;
