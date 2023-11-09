import { configureStore } from '@reduxjs/toolkit'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from "./userSlice"
import adminReducer from './adminSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const adminPersistConfig = {
    key: 'admin',
    version: 1,
    storage,
  };

const persistedReducer = persistReducer(persistConfig, userReducer)
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);

export const store = configureStore({
    reducer:  {
        user: persistedReducer,
        admin: persistedAdminReducer, 
      },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})


export const persistor = persistStore(store);