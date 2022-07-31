/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../../App/store";
import { get, set, remove } from "../../Utilities/localStorage";

export interface UserState {
  value: boolean;
}

const USER_TOKEN = "user-auth";

const initialState: UserState = {
  value: Boolean(get("user-auth")),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth: (state: { value: boolean }) => {
      state.value = true;
      set(USER_TOKEN, true);
    },
    removeAuth: (state: { value: boolean }) => {
      state.value = false;
      remove(USER_TOKEN);
    },
  },
});

export const { setAuth, removeAuth } = userSlice.actions;

export const selectAuth = (state: RootState) => state.user.value;

export default userSlice.reducer;
