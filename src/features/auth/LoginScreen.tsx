import { zodResolver } from '@hookform/resolvers/zod';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons/static';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, TextInput, useTheme } from 'react-native-paper';

import { spacing } from '@app/app/theme';
import { FormTextField } from '@app/components/form';
import { Screen } from '@app/components/layout/Screen';
import { AppButton } from '@app/components/ui';
import { useAppDispatch } from '@app/store';
import { signInWithDemoCredentials } from '@app/features/auth/authSlice';
import {
  demoSignInSchema,
  type DemoSignInValues,
} from '@app/features/auth/authSchema';

export function LoginScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DemoSignInValues>({
    defaultValues: { username: '', password: '' },
    resolver: zodResolver(demoSignInSchema),
  });

  return (
    <Screen scroll>
      <View style={styles.page}>
        <View style={styles.mainContent}>
          <View style={styles.hero}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.colors.primaryContainer },
              ]}
            >
              <MaterialDesignIcons
                name="account-circle-outline"
                size={64}
                color={theme.colors.onPrimaryContainer}
              />
            </View>
            <Text style={styles.title} variant="headlineMedium">
              Welcome back
            </Text>
            <Text style={styles.description} variant="bodyMedium">
              Sign in to explore the navigation boilerplate.
            </Text>
          </View>

          <Surface elevation={1} style={styles.formCard}>
            <Text style={styles.formTitle} variant="titleLarge">
              Sign in
            </Text>
            <View style={styles.fields}>
              <FormTextField
                control={control}
                name="username"
                label="Username"
                autoCapitalize="none"
                autoComplete="username"
                left={<TextInput.Icon icon="account-outline" />}
              />
              <FormTextField
                control={control}
                name="password"
                label="Password"
                autoCapitalize="none"
                autoComplete="current-password"
                secureTextEntry={!passwordVisible}
                left={<TextInput.Icon icon="lock-outline" />}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setPasswordVisible(current => !current)}
                  />
                }
              />
            </View>
            <AppButton
              contentStyle={styles.buttonContent}
              disabled={isSubmitting}
              loading={isSubmitting}
              onPress={() => {
                handleSubmit(values =>
                  dispatch(signInWithDemoCredentials(values)),
                )().catch(() => undefined);
              }}
            >
              Sign in to demo
            </AppButton>
          </Surface>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle} variant="labelLarge">
            Dummy login screen
          </Text>
          <Text style={styles.footerText} variant="bodySmall">
            You can type any username or password. Your password only needs to
            be at least 8 characters long; otherwise, you’ll see a validation
            error message.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  mainContent: { gap: spacing.xl },
  hero: { alignItems: 'center', gap: spacing.sm },
  iconContainer: {
    alignItems: 'center',
    borderRadius: 48,
    height: 96,
    justifyContent: 'center',
    width: 96,
  },
  title: { textAlign: 'center' },
  description: { maxWidth: 280, textAlign: 'center' },
  formCard: { borderRadius: 20, gap: spacing.md, padding: spacing.md },
  formTitle: { textAlign: 'center' },
  fields: { gap: spacing.sm },
  buttonContent: { minHeight: 48 },
  footer: { alignItems: 'center', gap: spacing.xs, paddingTop: spacing.xl },
  footerTitle: { textAlign: 'center' },
  footerText: { maxWidth: 320, textAlign: 'center' },
});
