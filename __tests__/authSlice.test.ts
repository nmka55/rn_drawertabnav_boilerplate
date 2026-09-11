import {
  bootstrapAuth,
  demoSignedIn,
  profileUpdated,
  signedOut,
  signInWithDemoCredentials,
  signOutAndClear,
  updateProfileAndPersist,
} from '@app/features/auth/authSlice';
import { createTestStore } from '@app/test/createTestStore';

describe('auth state', () => {
  it('keeps demo credentials out of Redux while persisting only an allowlisted profile', async () => {
    const { store, persisted } = createTestStore();
    const password = 'never-store-this-password';

    await store.dispatch(
      signInWithDemoCredentials({
        username: 'ada',
        firstName: 'Ada',
        lastName: 'Lovelace',
        password,
      }),
    );

    expect(store.getState().auth).toEqual({
      status: 'signedIn',
      profile: { username: 'ada', firstName: 'Ada', lastName: 'Lovelace' },
    });
    expect(JSON.stringify(store.getState())).not.toContain(password);
    expect(persisted.token()).toBe('test-session-token');
    expect(persisted.profile()).toEqual({
      username: 'ada',
      firstName: 'Ada',
      lastName: 'Lovelace',
    });
  });

  it('restores an authenticated state only when both session and profile exist', async () => {
    const { store } = createTestStore({
      sessionStore: {
        read: async () => 'existing-session',
        write: async () => undefined,
        clear: async () => undefined,
      },
      profileStore: {
        read: () => ({ username: 'ada', firstName: 'Ada' }),
        write: () => undefined,
        clear: () => undefined,
      },
    });

    await store.dispatch(bootstrapAuth());

    expect(store.getState().auth).toEqual({
      status: 'signedIn',
      profile: { username: 'ada', firstName: 'Ada' },
    });
  });

  it('supports gallery/demo reducer actions and safely clears state on sign-out', async () => {
    const { store, persisted } = createTestStore();

    store.dispatch(demoSignedIn({ username: 'ada' }));
    await store.dispatch(
      updateProfileAndPersist({ username: 'ada', firstName: 'Ada' }),
    );
    // The synchronous action remains useful in story/gallery demos.
    store.dispatch(profileUpdated({ username: 'ada', firstName: 'Grace' }));
    expect(store.getState().auth.profile).toEqual({
      username: 'ada',
      firstName: 'Grace',
    });
    expect(persisted.profile()).toEqual({ username: 'ada', firstName: 'Ada' });

    store.dispatch(signedOut());
    expect(store.getState().auth).toEqual({
      status: 'signedOut',
      profile: null,
    });

    await store.dispatch(signOutAndClear());
    expect(persisted.token()).toBeNull();
    expect(persisted.profile()).toBeNull();
  });

  it('persists the complete editable profile form', async () => {
    const { store, persisted } = createTestStore();
    const dateOfBirth = '1990-01-02T00:00:00.000Z';

    store.dispatch(demoSignedIn({ username: 'ada' }));
    await store.dispatch(
      updateProfileAndPersist({
        username: 'ada',
        firstName: 'Ada',
        lastName: 'Lovelace',
        gender: 'f',
        dateOfBirth,
        hasDriversLicense: true,
      }),
    );

    expect(store.getState().auth.profile).toEqual({
      username: 'ada',
      firstName: 'Ada',
      lastName: 'Lovelace',
      gender: 'f',
      dateOfBirth,
      hasDriversLicense: true,
    });
    expect(persisted.profile()).toEqual(store.getState().auth.profile);
  });
});
