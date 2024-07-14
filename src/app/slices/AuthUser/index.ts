import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "./type";

interface UserSliceType {
  user: null | User;
}

const initialState: UserSliceType = {
  user: null,
};

const authUserSlice = createSlice({
  name: "AuthUserSlice",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<null | User>) {
      state.user = action.payload;
    },
  },
});

export const { setAuthUser } = authUserSlice.actions;
export default authUserSlice.reducer;
