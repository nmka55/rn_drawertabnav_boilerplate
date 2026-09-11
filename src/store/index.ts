import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import authReducer from '@app/features/auth/authSlice';
import {
  defaultAuthDependencies,
  type AuthDependencies,
} from '@app/features/auth/authService';

/**
 * The factory makes state tests deterministic: tests pass in memory-only
 * dependencies instead of loading Keychain, Keystore, or MMKV native modules.
 */
export const createAppStore = (
  authDependencies: AuthDependencies = defaultAuthDependencies,
) =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: { extraArgument: authDependencies },
      }),
  });

export const store = createAppStore();

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Use these hooks everywhere instead of untyped React Redux hooks. */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
