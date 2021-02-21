import React from "react";
import { connect } from "react-redux";

import { Text, View } from "react-native";

export function TabADetails() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Tab A Details</Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return { userInfo: state?.userInfo };
};

export default connect(mapStateToProps)(TabADetails);
