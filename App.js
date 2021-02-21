import React from "react";
import "react-native-gesture-handler";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeTab from "./pages/Home/Navigation";
import NotificationsStack from "./pages/NotificationsScreen/Navigation";

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeTab} />
          <Drawer.Screen name="Notifications" component={NotificationsStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
