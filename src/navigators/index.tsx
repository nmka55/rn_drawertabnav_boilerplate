import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
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
  TabBarIconPropsType,
} from './types';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '@app/screens/login/login';
import NotificationsScreen from '@app/screens/notificationsScreen/notificationScreen';
import {Pressable} from 'react-native';
import React from 'react';
import {StoreRootState} from '@app/redux/store';
import TabA from '@app/screens/home/tabA';
import TabADetails from '@app/screens/home/tabADetails';
import TabB from '@app/screens/home/tabB';
import TabBDetails from '@app/screens/home/tabBDetails';
import {useSelector} from 'react-redux';

// #region Shared components and props
const DrawerButton = (): JSX.Element => {
  const {toggleDrawer} =
    useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <Pressable onPress={() => toggleDrawer()}>
      <Icon name="menu" size={20} color={'black'} />
    </Pressable>
  );
};

const initialDrawerScreenProps = (): Partial<NativeStackNavigationOptions> => ({
  headerLeft: () => DrawerButton(),
});

const RenderTabBarIcon = ({
  focused,
  color,
  size,
  route,
}: TabBarIconPropsType): JSX.Element => {
  let iconName = '';

  switch (route?.name) {
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
};

// #endregion

// #region Login Stack
const LoginStack = (): JSX.Element => {
  const {Navigator, Screen} = createNativeStackNavigator<LoginStackParamList>();

  return (
    <Navigator initialRouteName="Login">
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};

// #endregion

// #region Home Tab Navigators
// #region Home Tab A Stack

const HomeTabAStack = (): JSX.Element => {
  const {Navigator, Screen} =
    createNativeStackNavigator<HomeTabAStackParamList>();

  return (
    <Navigator initialRouteName="TabA">
      <Screen name="TabA" component={TabA} options={initialDrawerScreenProps} />
      <Screen name="TabADetails" component={TabADetails} />
    </Navigator>
  );
};

// #endregion

// #region Home Tab B Stack
const HomeTabBStack = (): JSX.Element => {
  const {Navigator, Screen} =
    createNativeStackNavigator<HomeTabBStackParamList>();

  return (
    <Navigator initialRouteName="TabB">
      <Screen name="TabB" component={TabB} options={initialDrawerScreenProps} />
      <Screen name="TabBDetails" component={TabBDetails} />
    </Navigator>
  );
};
// #endregion

const HomeTab = (): JSX.Element => {
  const {Navigator, Screen} = createBottomTabNavigator<HomeTabParamList>();

  const tabNavProps = {
    screenOptions: ({route}: BottomTabScreenProps<HomeTabParamList>) => ({
      tabBarActiveTintColor: Colors?.$iconPrimary,
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: (tabBarIconProps: TabBarIconPropsType) =>
        RenderTabBarIcon({...tabBarIconProps, route}),
    }),
  };

  return (
    <Navigator {...tabNavProps}>
      <Screen name="Tab A" component={HomeTabAStack} />
      <Screen name="Tab B" component={HomeTabBStack} />
    </Navigator>
  );
};
// #endregion

// #region Notification Stack
const NotificationsStack = (): JSX.Element => {
  const {Navigator, Screen} =
    createNativeStackNavigator<NotificationsStackParamList>();

  return (
    <Navigator>
      <Screen
        name="Notfications"
        component={NotificationsScreen}
        options={initialDrawerScreenProps}
      />
    </Navigator>
  );
};
// #endregion

// #region Main(current) Navigator
const CurrentNavigator = (): JSX.Element => {
  const {Navigator, Screen} = createDrawerNavigator<RootDrawerParamList>();

  const loggedin: boolean = useSelector(
    (state: StoreRootState) => state?.user?.loggedin ?? false,
  );

  if (!loggedin) {
    return <LoginStack />;
  }

  const drawerNavProps = {
    initialRouteName: 'Home' as keyof RootDrawerParamList,
    screenOptions: {
      headerShown: false,
      swipeEnabled: false,
      swipeEdgeWidth: 0,
      drawerActiveBackgroundColor: Colors?.$backgroundPrimaryLight,
      drawerActiveTintColor: Colors?.$textPrimary,
    },
  };

  return (
    <Navigator {...drawerNavProps}>
      <Screen name="Home" component={HomeTab} />
      <Screen name="Notifications" component={NotificationsStack} />
    </Navigator>
  );
};

// #endregion

export default () => (
  <NavigationContainer>
    <CurrentNavigator />
  </NavigationContainer>
);
