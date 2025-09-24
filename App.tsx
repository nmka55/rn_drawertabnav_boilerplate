import React from 'react';
import { persistor, store } from '@redux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import RootContainer from '@app/navigators';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
