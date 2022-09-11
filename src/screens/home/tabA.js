import {Button, View} from 'react-native';

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {userLogout} from '@app/redux/actions';

export default function TabA({navigation}) {
  const userData = useSelector(state => state?.user?.userData ?? {});
  const dispatch = useDispatch();

  const {username = ''} = userData ?? {};

  const onLogoutPress = () => {
    dispatch(userLogout());
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('TabADetails')}
        title={`Hello, ${username}. Go to User Details`}
      />
      <Button onPress={onLogoutPress} title={`Logout`} />
    </View>
  );
}
