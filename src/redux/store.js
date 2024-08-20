import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { filterSlice } from './filterSlice';
import { contactSlice } from './contactSlice';

// Combine your reducers
const rootReducer = combineReducers({
  contacts: contactSlice.reducer,
  filter: filterSlice.reducer,
});

// Create the persist config object
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'], // Only contacts will be persisted
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Persistor for redux-persist
export const persistor = persistStore(store);
