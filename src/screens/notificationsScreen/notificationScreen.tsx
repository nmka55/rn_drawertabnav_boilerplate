import {Text, View} from 'react-native-ui-lib';

import React from 'react';
import {GlobalStyles} from '@app/constants';

export default function NotificationsScreen(): React.JSX.Element {
  return (
    <View style={GlobalStyles?.containerBase}>
      <Text>Notifications Screen</Text>
    </View>
  );
}
