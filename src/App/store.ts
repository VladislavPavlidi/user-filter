import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import counterReducer from "../Features/counter/counterSlice";
import authReducer from "../Features/Auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: authReducer,
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
