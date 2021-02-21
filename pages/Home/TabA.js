import React from "react";
import { Text, View, Button } from "react-native";

export function TabA({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("TabADetails")}
        title="Go to Tab A Details"
      />
    </View>
  );
}

export function TabADetails() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Tab A Details</Text>
    </View>
  );
}
