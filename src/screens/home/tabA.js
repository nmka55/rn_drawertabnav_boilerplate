import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import React from 'react';
import globalStyles from '@app/constants/globalStyles';
import {userLogout} from '@app/redux/actions';

export default function TabA({navigation}) {
  const userData = useSelector(state => state?.user?.userData ?? {});
  const dispatch = useDispatch();

  const {username = ''} = userData ?? {};

  const onLogoutPress = () => {
    dispatch(userLogout());
  };

  return (
    <View style={styles?.containerBase}>
      <Button
        onPress={() => navigation.navigate('TabADetails')}
        title={`Hello, ${username}. Go to User Details`}
      />
      <Button onPress={onLogoutPress} title={'Logout'} />
    </View>
  );
}

const styles = StyleSheet.flatten([globalStyles, {}]);
