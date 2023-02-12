import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Button} from 'react-native-ui-lib';
import {HomeTabAStackParamList} from '@app/navigators/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StoreRootState} from '@app/redux/store';
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
        fullWidth
        onPress={() => navigation?.navigate('TabADetails')}
        label={`Hello, ${username}. Go to User Details`}
      />
      <Button link marginT-16 onPress={onLogoutPress} label={'Logout'} x />
    </View>
  );
}

const styles: any = StyleSheet.flatten([globalStyles, {}]);
