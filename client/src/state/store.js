import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './globalSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './api';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefault => getDefault().concat(api.middleware)
});

setupListeners(store.dispatch);