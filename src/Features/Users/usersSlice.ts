/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../../Api";
// eslint-disable-next-line import/no-cycle
import { RootState } from "../../App/store";
import { IUserCard } from "../../Pages/Users/Card";

export interface UsersState {
  value: IUserCard[];
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  value: [],
  status: "idle",
};

export const usersAsync = createAsyncThunk("users/fetchUsers", async () => {
  const response = await Api.get("https://reqres.in/api/users");
  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeUser: (
      state: {
        value: IUserCard[];
      },
      action: PayloadAction<IUserCard[]>
    ) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(usersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(usersAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectUsers = (state: RootState) => state.users.value;

export default usersSlice.reducer;
