import { configureStore } from '@reduxjs/toolkit';
import problemReducer from './slices/problem.slice';

const store:any = configureStore({
  reducer: {
    allProblems: problemReducer,
  },
});

// Define the type for the store's dispatch function
export type AppDispatch = typeof store.dispatch;

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;