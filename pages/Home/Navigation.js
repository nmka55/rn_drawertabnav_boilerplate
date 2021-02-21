import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { TabA, TabADetails } from "./TabA";
import { TabB, TabBDetails } from "./TabB";

const HomeTabAStackNav = createStackNavigator();
function HomeTabAStack() {
  return (
    <HomeTabAStackNav.Navigator initialRouteName="TabA">
      <HomeTabAStackNav.Screen
        name="TabA"
        component={TabA}
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
      <HomeTabAStackNav.Screen name="TabADetails" component={TabADetails} />
    </HomeTabAStackNav.Navigator>
  );
}

const HomeTabBStackNav = createStackNavigator();
function HomeTabBStack() {
  return (
    <HomeTabBStackNav.Navigator initialRouteName="TabB">
      <HomeTabBStackNav.Screen
        name="TabB"
        component={TabB}
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
      <HomeTabBStackNav.Screen name="TabBDetails" component={TabBDetails} />
    </HomeTabBStackNav.Navigator>
  );
}

const HomeTabNav = createBottomTabNavigator();
export default function HomeTab() {
  return (
    <HomeTabNav.Navigator
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Tab A":
              iconName = focused ? "home-circle" : "home-circle-outline";
              break;
            case "Tab B":
              iconName = focused ? "account-circle" : "account-circle-outline";
              break;
            default:
              break;
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <HomeTabNav.Screen name="Tab A" component={HomeTabAStack} />
      <HomeTabNav.Screen name="Tab B" component={HomeTabBStack} />
    </HomeTabNav.Navigator>
  );
}
