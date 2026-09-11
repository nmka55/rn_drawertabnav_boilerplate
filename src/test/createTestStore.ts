import { createAppStore, type AppStore } from '@app/store';
import type { PersistedProfile } from '@app/features/auth/authSchema';
import type { AuthDependencies } from '@app/features/auth/authService';

/**
 * In-memory native-service replacement for unit tests. It proves persistence
 * boundaries without invoking Keychain/Keystore or MMKV in Node.
 */
export const createTestStore = (overrides: Partial<AuthDependencies> = {}) => {
  let token: string | null = null;
  let profile: PersistedProfile | null = null;

  const dependencies: AuthDependencies = {
    sessionStore: {
      read: async () => token,
      write: async nextToken => {
        token = nextToken;
      },
      clear: async () => {
        token = null;
      },
    },
    profileStore: {
      read: () => profile,
      write: nextProfile => {
        profile = nextProfile;
      },
      clear: () => {
        profile = null;
      },
    },
    authApi: {
      signIn: async ({ username, firstName, lastName }) => ({
        token: 'test-session-token',
        profile: {
          username,
          ...(firstName ? { firstName } : {}),
          ...(lastName ? { lastName } : {}),
        },
      }),
    },
    ...overrides,
  };

  return {
    store: createAppStore(dependencies) as AppStore,
    dependencies,
    persisted: {
      token: () => token,
      profile: () => profile,
    },
  };
};
