import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";

import store from "./src/redux/store";
import RootContainer from "./src/navigators";

export default function App() {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}
