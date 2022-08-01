/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../../App/store";
import { get, set, remove } from "../../Utilities/localStorage";

export interface UserState {
  value: string;
}

const USER_TOKEN = "user-auth";

const initialState: UserState = {
  value: get("user-auth"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state: { value: string }, action: PayloadAction<string>) => {
      state.value = action.payload;
      set(USER_TOKEN, action.payload);
    },
    removeAuth: (state: { value: string }) => {
      state.value = "";
      remove(USER_TOKEN);
    },
  },
});

export const { setAuth, removeAuth } = userSlice.actions;

export const selectAuth = (state: RootState) => state.user.value;

export default userSlice.reducer;
