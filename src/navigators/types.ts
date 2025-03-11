import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';

export type RootDrawerParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  Notifications: NavigatorScreenParams<NotificationsStackParamList>;
};

export type LoginStackParamList = {
  Login: undefined;
};

export type NotificationsStackParamList = {
  NotificationsIndex: undefined;
};

export type HomeTabAStackParamList = {
  TabA: undefined;
  TabADetails: undefined;
};

export type HomeTabBStackParamList = {
  TabB: undefined;
  TabBDetails: undefined;
};

export type HomeTabParamList = {
  'Tab A': NavigatorScreenParams<HomeTabAStackParamList>;
  'Tab B': NavigatorScreenParams<HomeTabBStackParamList>;
};

export type TabBarIconPropsType = {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<HomeTabParamList, keyof HomeTabParamList>;
};
