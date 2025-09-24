import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
  persistReducer,
  persistStore,
} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '@app/redux/reducers';

// MMKV Storage setup
const storage = new MMKV();
const reduxStorage: Storage = {
  setItem: (key, value) => Promise.resolve(storage.set(key, value)),
  getItem: key => Promise.resolve(storage.getString(key)),
  removeItem: key => Promise.resolve(storage.delete(key)),
};

// Persist config
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

// Store types
export type StoreRootState = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;

export {store, persistor};
