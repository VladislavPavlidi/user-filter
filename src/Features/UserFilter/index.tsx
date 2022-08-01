/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { IFilterValues } from "../../Pages/Users/Filter";

export interface UserFilterState {
  value: IFilterValues;
}

const initialState: UserFilterState = {
  value: {
    first_name: "string",
    last_name: "string",
    email: "string",
  },
};

export const userFilterSlice = createSlice({
  name: "userFilter",
  initialState,
  reducers: {
    setUserFilter: (
      state: UserFilterState,
      action: PayloadAction<IFilterValues>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setUserFilter } = userFilterSlice.actions;

export const selectUserFilter = (state: RootState) => state.userFilter.value;

export default userFilterSlice.reducer;
