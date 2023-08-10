import {Button, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';

import {HomeTabAStackParamList} from '@app/navigators/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StoreRootState} from '@app/redux/store';
import {StyleSheet} from 'react-native';
import globalStyles from '@app/constants/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {userLogout} from '@app/redux/actions';

export default function TabA(): JSX.Element {
  const userData = useSelector(
    (state: StoreRootState) => state?.user?.userData ?? {},
  );

  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabAStackParamList>>();

  const {username = ''} = userData ?? {};

  const onLogoutPress = () => {
    dispatch(userLogout());
  };

  return (
    <View style={styles?.containerBase}>
      <Button
        onPress={() => navigation?.navigate('TabADetails')}
        label={`Hello, ${username}. Go to User Details`}
      />
      <Button link marginT-16 onPress={onLogoutPress} label={'Logout'} x />
    </View>
  );
}

const styles: any = StyleSheet.flatten([globalStyles, {}]);
