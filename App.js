import {persistor, store} from '@app/redux/store';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import RootContainer from '@app/navigators';
import {Typography, Colors, Spacings} from 'react-native-ui-lib';
import theme from '@app/constants/theme';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['The new TextField implementation does not support the ']);

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
