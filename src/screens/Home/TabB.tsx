import {Button, View} from 'react-native-ui-lib';

import {HomeTabBStackParamList} from '@app/navigators/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {GlobalStyles} from '@app/constants';
import {useNavigation} from '@react-navigation/native';

export default function TabB(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabBStackParamList>>();

  return (
    <View style={GlobalStyles.containerBase}>
      <Button
        onPress={() => navigation?.navigate('TabBDetails')}
        label="Go to Tab B Details"
      />
    </View>
  );
}
