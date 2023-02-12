import {Button} from 'react-native-ui-lib';
import {HomeTabBStackParamList} from '@app/navigators/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {globalStyles} from '@app/constants';
import {useNavigation} from '@react-navigation/native';

export default function TabB(): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabBStackParamList>>();

  return (
    <View style={globalStyles.containerBase}>
      <Button
        fullWidth
        onPress={() => navigation?.navigate('TabBDetails')}
        label="Go to Tab B Details"
      />
    </View>
  );
}
