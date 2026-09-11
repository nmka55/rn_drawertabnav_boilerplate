import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Screen } from '@app/components/layout/Screen';
import { AppButton } from '@app/components/ui';
import type { HomeStackParamList } from '@app/navigation/types';
import { useAppDispatch, useAppSelector } from '@app/store';
import { selectProfile, signOutAndClear } from '@app/features/auth/authSlice';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;
export function HomeScreen({ navigation }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const greeting = profile?.firstName || profile?.username || 'there';
  return (
    <Screen>
      <View style={styles.content}>
        <Text variant="headlineSmall">Hello, {greeting}</Text>
        <AppButton onPress={() => navigation.navigate('Profile')}>
          Open user details
        </AppButton>
        <AppButton mode="outlined" onPress={() => dispatch(signOutAndClear())}>
          Sign out
        </AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({ content: { gap: 12 } });
