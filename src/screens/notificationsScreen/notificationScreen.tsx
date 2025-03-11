import {Text, View} from 'react-native-ui-lib';

import React from 'react';
import {globalStyles} from '@app/constants';

export default function NotificationsScreen(): React.JSX.Element {
  return (
    <View style={globalStyles?.containerBase}>
      <Text>Notifications Screen</Text>
    </View>
  );
}
