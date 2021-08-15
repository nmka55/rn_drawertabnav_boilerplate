import "react-native-gesture-handler";

import { persistor, store } from "./src/redux/store";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import RootContainer from "./src/navigators";

export default function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootContainer />
    </PersistGate>
  </Provider>
  );
}
