import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  HomeTabAStackParamList,
  HomeTabBStackParamList,
  HomeTabParamList,
  LoginStackParamList,
  NotificationsStackParamList,
  RootDrawerParamList,
} from '@navigators/types';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { Pressable, useColorScheme } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '@app/screens/login/Login';
import NotificationsScreen from '@app/screens/notificationsScreen/NotificationScreen';
import React from 'react';
import { StoreRootState } from '@app/redux/store';
import TabA from '@app/screens/home/TabA';
import TabADetails from '@app/screens/home/TabADetails';
import TabB from '@app/screens/home/TabB';
import TabBDetails from '@app/screens/home/TabBDetails';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import useTheme from '@app/constants/Theme';

// Shared components and props
const DrawerButton = (): React.JSX.Element => {
  const theme = useTheme();

  const { toggleDrawer } =
    useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  return (
    <Pressable onPress={toggleDrawer} style={{}}>
      <Icon name="menu" size={20} color={theme?.colors?.primary} />
    </Pressable>
  );
};

const drawerScreenOptions = (): Partial<NativeStackNavigationOptions> => ({
  headerLeft: () => <DrawerButton />,
});

const RenderTabBarIcon = ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string;
  size: number;
}): React.JSX.Element => {
  const iconMap: Record<string, [string, string]> = {
    'Tab A': ['home-circle-outline', 'home-circle'],
    'Tab B': ['account-circle-outline', 'account-circle'],
  };

  const [defaultIcon, focusedIcon] = iconMap['Tab A'] || ['', ''];
  const iconName = focused ? focusedIcon : defaultIcon;

  return <Icon name={iconName} size={size} color={color} />;
};

// Login Stack
const LoginStack = (): React.JSX.Element => {
  const { Navigator, Screen } =
    createNativeStackNavigator<LoginStackParamList>();
  return (
    <Navigator initialRouteName="Login">
      <Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Navigator>
  );
};

// Home Tab A Stack
const HomeTabAStack = (): React.JSX.Element => {
  const { Navigator, Screen } =
    createNativeStackNavigator<HomeTabAStackParamList>();
  return (
    <Navigator initialRouteName="TabA">
      <Screen name="TabA" component={TabA} options={drawerScreenOptions} />
      <Screen name="TabADetails" component={TabADetails} />
    </Navigator>
  );
};

// Home Tab B Stack
const HomeTabBStack = (): React.JSX.Element => {
  const { Navigator, Screen } =
    createNativeStackNavigator<HomeTabBStackParamList>();
  return (
    <Navigator initialRouteName="TabB">
      <Screen name="TabB" component={TabB} options={drawerScreenOptions} />
      <Screen name="TabBDetails" component={TabBDetails} />
    </Navigator>
  );
};

// Home Tab};

const HomeTab = (): React.JSX.Element => {
  const { Navigator, Screen } = createBottomTabNavigator<HomeTabParamList>();
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: theme?.colors?.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) =>
          RenderTabBarIcon({ focused, color, size }),
      })}
    >
      <Screen name="Tab A" component={HomeTabAStack} />
      <Screen name="Tab B" component={HomeTabBStack} />
    </Navigator>
  );
};

// Notifications Stack
const NotificationsStack = (): React.JSX.Element => {
  const { Navigator, Screen } =
    createNativeStackNavigator<NotificationsStackParamList>();
  return (
    <Navigator>
      <Screen
        name="NotificationsIndex"
        component={NotificationsScreen}
        options={drawerScreenOptions}
      />
    </Navigator>
  );
};

// Current Navigator
const CurrentNavigator = (): React.JSX.Element => {
  const { Navigator, Screen } = createDrawerNavigator<RootDrawerParamList>();
  const loggedin = useSelector(
    (state: StoreRootState) => state?.user?.loggedin ?? false,
  );

  if (!loggedin) {
    return <LoginStack />;
  }

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        swipeEdgeWidth: 0,
      }}
    >
      <Screen name="Home" component={HomeTab} />
      <Screen name="Notifications" component={NotificationsStack} />
    </Navigator>
  );
};

// Main App Entry
export default (): React.JSX.Element => {
  const currentTheme = useColorScheme() === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer theme={currentTheme}>
      <CurrentNavigator />
    </NavigationContainer>
  );
};
