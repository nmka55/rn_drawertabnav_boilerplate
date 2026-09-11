import * as Keychain from 'react-native-keychain';
import { createMMKV } from 'react-native-mmkv';

import {
  type AuthProfile,
  type DemoSignInValues,
  persistedProfileSchema,
  type PersistedProfile,
  toPersistedProfile,
} from '@app/features/auth/authSchema';

const SESSION_SERVICE = 'com.rn_drawertabnav_boilerplate.session';
const PROFILE_STORAGE_KEY = 'auth.persistedProfile.v1';

/**
 * Access tokens belong in the OS-protected Keychain/Keystore, not Redux or
 * MMKV. Keeping this interface small also lets tests inject an in-memory fake.
 */
export interface SecureSessionStore {
  read(): Promise<string | null>;
  write(token: string): Promise<void>;
  clear(): Promise<void>;
}

/** Only the allowlisted, non-secret profile summary is stored in MMKV. */
export interface ProfileStore {
  read(): PersistedProfile | null;
  write(profile: PersistedProfile): void;
  clear(): void;
}

/**
 * Boundary for the eventual backend. The provided implementation is visibly a
 * demo: it never validates credentials and must be replaced for a real app.
 */
export interface AuthApi {
  signIn(values: DemoSignInValues): Promise<{
    token: string;
    profile: AuthProfile;
  }>;
}

export type AuthDependencies = {
  sessionStore: SecureSessionStore;
  profileStore: ProfileStore;
  authApi: AuthApi;
};

export const secureSessionStore: SecureSessionStore = {
  async read() {
    const credentials = await Keychain.getGenericPassword({
      service: SESSION_SERVICE,
    });

    return credentials ? credentials.password : null;
  },

  async write(token) {
    const didSave = await Keychain.setGenericPassword('session', token, {
      service: SESSION_SERVICE,
      // The session is device-bound and inaccessible while the device is locked.
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });

    if (!didSave) {
      throw new Error('The session could not be saved securely.');
    }
  },

  async clear() {
    await Keychain.resetGenericPassword({ service: SESSION_SERVICE });
  },
};

const preferences = createMMKV({ id: 'boilerplate-preferences' });

export const profileStore: ProfileStore = {
  read() {
    const rawProfile = preferences.getString(PROFILE_STORAGE_KEY);
    if (!rawProfile) {
      return null;
    }

    try {
      const parsed = persistedProfileSchema.safeParse(JSON.parse(rawProfile));
      return parsed.success ? parsed.data : null;
    } catch {
      // A malformed optional preference must not prevent the app from booting.
      return null;
    }
  },

  write(profile) {
    preferences.set(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  },

  clear() {
    preferences.remove(PROFILE_STORAGE_KEY);
  },
};

/**
 * Replace this with a real API client before shipping. It deliberately does
 * not save or log the password; it simply produces a temporary demo session.
 */
export const demoAuthApi: AuthApi = {
  async signIn({ username, firstName, lastName }) {
    return {
      token: `demo-session-${Date.now()}`,
      profile: {
        username,
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
      },
    };
  },
};

export const defaultAuthDependencies: AuthDependencies = {
  sessionStore: secureSessionStore,
  profileStore,
  authApi: demoAuthApi,
};

export { toPersistedProfile };
