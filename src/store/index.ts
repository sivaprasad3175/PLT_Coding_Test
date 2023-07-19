
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import customStorage from './CustomSecureStore';
import { rootReducer } from './rootReducer';
// import { pokemonApi } from '../services/api';

const persistConfig = {
  key: 'root',
  storage: customStorage,
};

// const rootReducer = combineReducers({
//   [pokemonApi.reducerPath]: pokemonApi.reducer,
// })

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const setupStore = (preloadedState?: PreloadedState<RootState>): any => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState,
  });
};


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

