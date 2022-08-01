/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../../Api";
import { RootState } from "../../App/store";
import { IUserCard } from "../../Pages/Users/Card";
// import { IFilterValues } from "../../Pages/Users/Filter";

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
      action: PayloadAction<number>
    ) => {
      state.value = state.value.filter(({ id }) => id !== action.payload);
    },
    filterUsers: (
      state: {
        value: IUserCard[];
      },
      action: PayloadAction<any>
    ) => {
      state.value = state.value.filter((user: any) =>
        Object.entries(action.payload).every(([key, value]) =>
          user[key].startsWith(value)
        )
      );
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

export const { removeUser, filterUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.value;

export default usersSlice.reducer;
