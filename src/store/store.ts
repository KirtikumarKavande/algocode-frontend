import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/problem.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Define the type for the store's dispatch function
export type AppDispatch = typeof store.dispatch;

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
