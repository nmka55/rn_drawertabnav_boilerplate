import 'react-native-gesture-handler';

import {Provider} from 'react-redux';
import React from 'react';
import RootContainer from './src/navigators';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}
