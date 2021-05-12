import {Button, Text, View} from 'react-native';

import React from 'react';

export function TabB({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('TabBDetails')}
        title="Go to Tab B Details"
      />
    </View>
  );
}

export function TabBDetails() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Tab B Details</Text>
    </View>
  );
}
