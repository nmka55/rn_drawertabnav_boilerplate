import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '@app/store';
import type {
  AuthProfile,
  DemoSignInValues,
} from '@app/features/auth/authSchema';
import {
  type AuthDependencies,
  toPersistedProfile,
} from '@app/features/auth/authService';

export type AuthStatus = 'booting' | 'signedOut' | 'signedIn';

export type AuthState = {
  status: AuthStatus;
  profile: AuthProfile | null;
};

const initialState: AuthState = {
  status: 'booting',
  profile: null,
};

/** Restores only a Keychain session plus the MMKV profile allowlist at boot. */
export const bootstrapAuth = createAsyncThunk<
  AuthProfile | null,
  void,
  { extra: AuthDependencies }
>('auth/bootstrap', async (_, { extra }) => {
  const token = await extra.sessionStore.read();
  const profile = extra.profileStore.read();

  // A token without its profile cannot render an authenticated UI safely.
  if (!token || !profile) {
    // Clear partial state left by an interrupted write or an older app version.
    if (token || profile) {
      await extra.sessionStore.clear();
      extra.profileStore.clear();
    }

    return null;
  }

  return profile;
});

/**
 * Demo-only request flow. Credentials are passed directly to the API boundary
 * and are never used as a Redux action payload or stored locally.
 */
export const signInWithDemoCredentials = createAsyncThunk<
  AuthProfile,
  DemoSignInValues,
  { extra: AuthDependencies }
>('auth/signInWithDemoCredentials', async (values, { extra }) => {
  const { token, profile } = await extra.authApi.signIn(values);
  await extra.sessionStore.write(token);
  extra.profileStore.write(toPersistedProfile(profile));
  return profile;
});

/** Clear the credential and the small persisted profile summary on sign-out. */
export const signOutAndClear = createAsyncThunk<
  void,
  void,
  { extra: AuthDependencies }
>('auth/signOutAndClear', async (_, { extra }) => {
  await extra.sessionStore.clear();
  extra.profileStore.clear();
});

/** Use this from an editable profile screen so its allowlisted fields survive restart. */
export const updateProfileAndPersist = createAsyncThunk<
  AuthProfile,
  AuthProfile,
  { extra: AuthDependencies }
>('auth/updateProfileAndPersist', async (profile, { extra }) => {
  extra.profileStore.write(toPersistedProfile(profile));
  return profile;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Useful for UI demos and reducer tests; real sign-in uses the thunk above. */
    demoSignedIn: (
      state,
      action: PayloadAction<{
        username: string;
        firstName?: string;
        lastName?: string;
      }>,
    ) => {
      state.status = 'signedIn';
      state.profile = action.payload;
    },
    profileUpdated: (state, action: PayloadAction<AuthProfile>) => {
      if (state.status === 'signedIn') {
        state.profile = action.payload;
      }
    },
    signedOut: state => {
      state.status = 'signedOut';
      state.profile = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.status = action.payload ? 'signedIn' : 'signedOut';
        state.profile = action.payload;
      })
      .addCase(bootstrapAuth.rejected, state => {
        state.status = 'signedOut';
        state.profile = null;
      })
      .addCase(signInWithDemoCredentials.fulfilled, (state, action) => {
        state.status = 'signedIn';
        state.profile = action.payload;
      })
      .addCase(signInWithDemoCredentials.rejected, state => {
        state.status = 'signedOut';
        state.profile = null;
      })
      .addCase(signOutAndClear.fulfilled, state => {
        state.status = 'signedOut';
        state.profile = null;
      })
      .addCase(updateProfileAndPersist.fulfilled, (state, action) => {
        if (state.status === 'signedIn') {
          state.profile = action.payload;
        }
      });
  },
});

export const { demoSignedIn, profileUpdated, signedOut } = authSlice.actions;

export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectProfile = (state: RootState) => state.auth.profile;

export default authSlice.reducer;
