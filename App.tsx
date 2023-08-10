import {Colors, Typography} from 'react-native-ui-lib';
import React, {useEffect} from 'react';
import {persistor, store} from '@redux/store';

import {LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import RootContainer from '@app/navigators';
import {theme} from '@constants';

//For dark theme support
require('react-native-ui-lib/config').setConfig({appScheme: 'default'});

LogBox.ignoreLogs([
  'The new TextField implementation does not support the', // RN UI Lib will fix this when TextField migrattion done
  'Warning: Function components cannot be given refs.', // RN UI Lib TextField leadingAccessory ref warning
]);

export default function App(): JSX.Element {
  useEffect(() => {
    Colors.loadDesignTokens({primaryColor: theme?.primaryColor});
    Colors.loadColors(theme?.colors);
    Typography.loadTypographies(theme?.fonts);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootContainer />
      </PersistGate>
    </Provider>
  );
}
