/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../Features/counter/counterSlice";
import authReducer from "../Features/Auth/authSlice";
import usersReducer from "../Features/Users/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: authReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
