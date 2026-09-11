import type { PropsWithChildren, ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@app/app/theme';

type ScreenProps = PropsWithChildren<{
  /** Use scrolling for forms or long content. It remains keyboard-safe. */
  scroll?: boolean;
  topAccessory?: ReactNode;
  bottomAccessory?: ReactNode;
  bleedTop?: boolean;
  bleedBottom?: boolean;
}>;

/** Applies a uniform safe-area and keyboard policy to every page. */
export function Screen({
  children,
  scroll = false,
  topAccessory,
  bottomAccessory,
  bleedTop = false,
  bleedBottom = false,
}: ScreenProps): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const insetStyles = StyleSheet.create({
    content: {
      paddingBottom: bleedBottom ? spacing.md : insets.bottom + spacing.md,
      paddingTop: bleedTop ? 0 : insets.top + spacing.md,
    },
    bottomAccessory: { paddingBottom: bleedBottom ? 0 : insets.bottom },
    topAccessory: { paddingTop: bleedTop ? 0 : insets.top },
  });
  const content = (
    <View style={[styles.content, insetStyles.content]}>{children}</View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
    >
      {topAccessory ? (
        <View style={insetStyles.topAccessory}>{topAccessory}</View>
      ) : null}
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
      {bottomAccessory ? (
        <View style={insetStyles.bottomAccessory}>{bottomAccessory}</View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flex: 1, gap: spacing.sm, paddingHorizontal: spacing.md },
  scrollContent: { flexGrow: 1 },
});
