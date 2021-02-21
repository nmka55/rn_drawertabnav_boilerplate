import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import { NotificationsScreen } from "./NotificationScreen";

const NotificationsStackNav = createStackNavigator();
export default function NotificationsStack() {
  return (
    <NotificationsStackNav.Navigator>
      <NotificationsStackNav.Screen
        name="Notfications"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <MaterialCommunityIcons
              name="menu"
              size={24}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </NotificationsStackNav.Navigator>
  );
}
