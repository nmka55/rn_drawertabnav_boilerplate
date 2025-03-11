import React from 'react';
import {Pressable, useColorScheme} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {StoreRootState} from '@app/redux/store';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';

import {
  HomeTabAStackParamList,
  HomeTabBStackParamList,
  HomeTabParamList,
  LoginStackParamList,
  NotificationsStackParamList,
  RootDrawerParamList,
  TabBarIconPropsType,
} from './types';

import Login from '@app/screens/login/login';
import NotificationsScreen from '@app/screens/notificationsScreen/notificationScreen';
import TabA from '@app/screens/home/tabA';
import TabADetails from '@app/screens/home/tabADetails';
import TabB from '@app/screens/home/tabB';
import TabBDetails from '@app/screens/home/tabBDetails';

// Shared components and props
const DrawerButton = (): React.JSX.Element => {
  const {toggleDrawer} =
    useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  return (
    <Pressable onPress={toggleDrawer}>
      <Icon name="menu" size={20} color={Colors.$iconPrimary} />
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
  route,
}: TabBarIconPropsType): React.JSX.Element => {
  if (!route) {
    // Handle undefined route case (optional)
    return <Icon name="alert-circle-outline" size={size} color={color} />;
  }

  const iconMap: Record<string, [string, string]> = {
    'Tab A': ['home-circle-outline', 'home-circle'],
    'Tab B': ['account-circle-outline', 'account-circle'],
  };

  const [defaultIcon, focusedIcon] = iconMap[route.name] || ['', ''];
  const iconName = focused ? focusedIcon : defaultIcon;

  return <Icon name={iconName} size={size} color={color} />;
};

// Login Stack
const LoginStack = (): React.JSX.Element => {
  const {Navigator, Screen} = createNativeStackNavigator<LoginStackParamList>();
  return (
    <Navigator initialRouteName="Login">
      <Screen name="Login" component={Login} options={{headerShown: false}} />
    </Navigator>
  );
};

// Home Tab A Stack
const HomeTabAStack = (): React.JSX.Element => {
  const {Navigator, Screen} =
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
  const {Navigator, Screen} =
    createNativeStackNavigator<HomeTabBStackParamList>();
  return (
    <Navigator initialRouteName="TabB">
      <Screen name="TabB" component={TabB} options={drawerScreenOptions} />
      <Screen name="TabBDetails" component={TabBDetails} />
    </Navigator>
  );
};

// Home Tab
const HomeTab = (): React.JSX.Element => {
  const {Navigator, Screen} = createBottomTabNavigator<HomeTabParamList>();
  return (
    <Navigator
      screenOptions={({route}: BottomTabScreenProps<HomeTabParamList>) => ({
        tabBarActiveTintColor: Colors.$iconPrimary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: (props: TabBarIconPropsType) =>
          RenderTabBarIcon({...props, route}),
      })}>
      <Screen name="Tab A" component={HomeTabAStack} />
      <Screen name="Tab B" component={HomeTabBStack} />
    </Navigator>
  );
};

// Notifications Stack
const NotificationsStack = (): React.JSX.Element => {
  const {Navigator, Screen} =
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
  const {Navigator, Screen} = createDrawerNavigator<RootDrawerParamList>();
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
        drawerActiveBackgroundColor: Colors.$backgroundPrimaryLight,
        drawerActiveTintColor: Colors.$textPrimary,
      }}>
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
