import {Colors, Typography} from 'react-native-ui-lib';
import React, {useEffect} from 'react';
import {persistor, store} from '@app/redux/store';

import {LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import RootContainer from '@app/navigators';
import theme from '@app/constants';

LogBox.ignoreLogs([
  'The new TextField implementation does not support the',
  'Warning: Function components cannot be given refs.',
]);

export default function App() {
  useEffect(() => {
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
