import React from 'react';
import {Text} from 'react-native-ui-lib';
import {View} from 'react-native';
import {globalStyles} from '@app/constants';

export default function NotificationsScreen(): JSX.Element {
  return (
    <View style={globalStyles?.containerBase}>
      <Text>Notifications Screen</Text>
    </View>
  );
}
