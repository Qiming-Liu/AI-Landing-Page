import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';

import reducer from './reducer';

// ----------------------------------------------------------------------

// Define the root state type using the ReturnType utility of TypeScript
export type RootState = ReturnType<typeof reducer>;

// Define the type for dispatching actions from the store
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Extract the dispatch function from the store for convenience
const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

// Create a custom useDispatch hook with typed dispatch
const useDispatch = () => useAppDispatch<AppDispatch>();

// Export the Redux store, dispatch, useSelector, and useDispatch for use in components
export { dispatch, store, useDispatch, useSelector };
