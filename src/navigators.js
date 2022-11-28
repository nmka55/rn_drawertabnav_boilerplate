import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {TabB, TabBDetails} from '@app/screens/home/tabB';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '@app/screens/login/login';
import NotificationsScreen from '@app/screens/notificationsScreen/notificationScreen';
import {Pressable} from 'react-native';
import React from 'react';
import TabA from '@app/screens/home/tabA';
import TabADetails from '@app/screens/home/tabADetails';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

const DrawerButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.toggleDrawer()}>
      <Icon name="menu" size={24} />
    </Pressable>
  );
};

const initialScreenProps = () => ({
  headerLeft: () => DrawerButton(),
});

function LoginStack() {
  const {Navigator, Screen} = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="Login">
      <Screen
        name="Login"
        component={Login}
        screenOptions={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}

function HomeTabAStack() {
  const {Navigator, Screen} = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="TabA">
      <Screen name="TabA" component={TabA} options={initialScreenProps} />
      <Screen name="TabADetails" component={TabADetails} />
    </Navigator>
  );
}

function HomeTabBStack() {
  const {Navigator, Screen} = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="TabB">
      <Screen name="TabB" component={TabB} options={initialScreenProps} />
      <Screen name="TabBDetails" component={TabBDetails} />
    </Navigator>
  );
}

function HomeTab() {
  const {Navigator, Screen} = createBottomTabNavigator();

  const tabNavProps = {
    screenOptions: ({route}) => ({
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        switch (route.name) {
          case 'Tab A':
            iconName = focused ? 'home-circle' : 'home-circle-outline';
            break;
          case 'Tab B':
            iconName = focused ? 'account-circle' : 'account-circle-outline';
            break;
          default:
            break;
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
    }),
  };

  return (
    <Navigator {...tabNavProps}>
      <Screen name="Tab A" component={HomeTabAStack} />
      <Screen name="Tab B" component={HomeTabBStack} />
    </Navigator>
  );
}

function NotificationsStack() {
  const {Navigator, Screen} = createNativeStackNavigator();

  return (
    <Navigator>
      <Screen
        name="Notfications"
        component={NotificationsScreen}
        options={({}) => ({
          headerLeft: () => DrawerButton(),
        })}
      />
    </Navigator>
  );
}

export default () => {
  const {Navigator, Screen} = createDrawerNavigator();

  const loggedin = useSelector(state => state?.user?.loggedin ?? false);

  const CurrentNavigator = () => {
    if (loggedin) {
      const drawerNavProps = {
        initialRouteName: 'Home',
        screenOptions: {
          headerShown: false,
          swipeEnabled: false,
          swipeEdgeWidth: 0,
        },
      };

      return (
        <Navigator {...drawerNavProps}>
          <Screen name="Home" component={HomeTab} />
          <Screen name="Notifications" component={NotificationsStack} />
        </Navigator>
      );
    } else {
      return <LoginStack />;
    }
  };

  return (
    <NavigationContainer>
      <CurrentNavigator />
    </NavigationContainer>
  );
};
