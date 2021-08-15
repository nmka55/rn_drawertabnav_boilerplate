import { TabB, TabBDetails } from "./pages/home/tabB";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Login from "./pages/login/login";
import { NavigationContainer } from "@react-navigation/native";
import NotificationsScreen from "./pages/notificationsScreen/notificationScreen";
import React from "react";
import TabA from "./pages/home/tabA";
import TabADetails from "./pages/home/tabADetails";
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

const drawerButton = (navigation) => {
  return (
    <Icon
      name="menu"
      size={24}
      style={{ marginLeft: 10 }}
      onPress={() => navigation.toggleDrawer()}
    />
  );
};

const Drawer = createDrawerNavigator();

const LoginStackNav = createStackNavigator();
function LoginStack() {
  return (
    <LoginStackNav.Navigator initialRouteName="Login">
      <LoginStackNav.Screen
        name="Login"
        component={Login}
        screenOptions={{
          headerShown: false,
        }}
      />
    </LoginStackNav.Navigator>
  );
}

const HomeTabAStackNav = createStackNavigator();
function HomeTabAStack() {
  return (
    <HomeTabAStackNav.Navigator initialRouteName="TabA">
      <HomeTabAStackNav.Screen
        name="TabA"
        component={TabA}
        options={({ navigation }) => ({
          headerLeft: () => drawerButton(navigation),
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
          headerLeft: () => drawerButton(navigation),
        })}
      />
      <HomeTabBStackNav.Screen name="TabBDetails" component={TabBDetails} />
    </HomeTabBStackNav.Navigator>
  );
}

const HomeTabNav = createBottomTabNavigator();
function HomeTab() {
  return (
    <HomeTabNav.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
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
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <HomeTabNav.Screen name="Tab A" component={HomeTabAStack} />
      <HomeTabNav.Screen name="Tab B" component={HomeTabBStack} />
    </HomeTabNav.Navigator>
  );
}

const NotificationStackNav = createStackNavigator();
function NotificationsStack() {
  return (
    <NotificationStackNav.Navigator>
      <NotificationStackNav.Screen
        name="Notfications"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          headerLeft: () => drawerButton(navigation),
        })}
      />
    </NotificationStackNav.Navigator>
  );
}

function RootContainer({ user }) {
  if (user?.loggedin)
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Drawer.Screen name="Home" component={HomeTab} />
          <Drawer.Screen name="Notifications" component={NotificationsStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  else
    return (
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    );
}

const mapStateToProps = (state) => {
  return { user: state?.user };
};
export default connect(mapStateToProps)(RootContainer);
