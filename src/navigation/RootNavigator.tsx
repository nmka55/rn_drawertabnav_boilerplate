import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  type DrawerNavigationProp,
} from '@react-navigation/drawer';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { LoginScreen } from '@app/features/auth/LoginScreen';
import { selectAuthStatus } from '@app/features/auth/authSlice';
import { HomeScreen } from '@app/features/home/HomeScreen';
import { ProfileScreen } from '@app/features/home/ProfileScreen';
import { NotificationsScreen } from '@app/features/notifications/NotificationsScreen';
import { ShowcaseScreen } from '@app/features/showcase/ShowcaseScreen';
import { useAppSelector } from '@app/store';
import type {
  AppDrawerParamList,
  AuthStackParamList,
  ComponentsStackParamList,
  HomeStackParamList,
  MainTabsParamList,
  NotificationsStackParamList,
} from '@app/navigation/types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ComponentsStack = createNativeStackNavigator<ComponentsStackParamList>();
const NotificationsStack =
  createNativeStackNavigator<NotificationsStackParamList>();
const Tabs = createBottomTabNavigator<MainTabsParamList>();
const Drawer = createDrawerNavigator<AppDrawerParamList>();

const DRAWER_ID = 'authenticated-drawer';

/** Opens the authenticated drawer from the root screens of nested stacks. */
function DrawerButton(): React.JSX.Element {
  const navigation =
    useNavigation<
      DrawerNavigationProp<AppDrawerParamList, 'Main', typeof DRAWER_ID>
    >();
  const theme = useTheme();

  return (
    <Pressable
      accessibilityLabel="Open menu"
      hitSlop={8}
      onPress={() =>
        navigation
          .getParent<DrawerNavigationProp<AppDrawerParamList>>(DRAWER_ID)
          ?.toggleDrawer()
      }
      style={styles.drawerButton}
    >
      <MaterialDesignIcons
        color={theme.colors.onSurface}
        name="menu"
        size={24}
      />
    </Pressable>
  );
}

const rootStackOptions = { headerLeft: () => <DrawerButton /> };

function HomeNavigator(): React.JSX.Element {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', ...rootStackOptions }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'User details' }}
      />
    </HomeStack.Navigator>
  );
}

function ComponentsNavigator(): React.JSX.Element {
  return (
    <ComponentsStack.Navigator>
      <ComponentsStack.Screen
        name="Components"
        component={ShowcaseScreen}
        options={{ title: 'Components', ...rootStackOptions }}
      />
    </ComponentsStack.Navigator>
  );
}

function NotificationsNavigator(): React.JSX.Element {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Notifications', ...rootStackOptions }}
      />
    </NotificationsStack.Navigator>
  );
}

function MainTabs(): React.JSX.Element {
  const theme = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarIcon: ({ color, size }) => (
          <MaterialDesignIcons
            color={color}
            size={size}
            name={
              route.name === 'HomeTab'
                ? 'home-variant-outline'
                : 'view-dashboard-outline'
            }
          />
        ),
      })}
    >
      <Tabs.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{ title: 'Home' }}
      />
      <Tabs.Screen name="Components" component={ComponentsNavigator} />
    </Tabs.Navigator>
  );
}

function AppDrawer(): React.JSX.Element {
  return (
    <Drawer.Navigator
      id={DRAWER_ID}
      screenOptions={{ headerShown: false, swipeEnabled: false }}
    >
      <Drawer.Screen
        name="Main"
        component={MainTabs}
        options={{ title: 'Home' }}
      />
      <Drawer.Screen name="Notifications" component={NotificationsNavigator} />
    </Drawer.Navigator>
  );
}

/** The signed-out and signed-in navigator trees are mutually exclusive. */
export function RootNavigator(): React.JSX.Element {
  const status = useAppSelector(selectAuthStatus);
  const paperTheme = useTheme();
  const navigationBaseTheme = paperTheme.dark
    ? NavigationDarkTheme
    : NavigationLightTheme;
  const navigationTheme = {
    ...navigationBaseTheme,
    colors: {
      ...navigationBaseTheme.colors,
      background: paperTheme.colors.background,
      border: paperTheme.colors.outlineVariant,
      card: paperTheme.colors.surface,
      notification: paperTheme.colors.error,
      primary: paperTheme.colors.primary,
      text: paperTheme.colors.onSurface,
    },
  };

  if (status === 'booting') {
    return (
      <View
        style={[
          styles.booting,
          { backgroundColor: paperTheme.colors.background },
        ]}
      >
        <ActivityIndicator color={paperTheme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {status === 'signedIn' ? (
        <AppDrawer />
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  booting: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  drawerButton: { paddingHorizontal: 8 },
});
