import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./userType";

type userState = {
  currentUser: User | null;
};

const initialState: userState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    updateFirstName: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.firstName = action.payload;
      }
    },
    updateLastName: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.lastName = action.payload;
      }
    },
  },
});
export const { setCurrentUser, updateFirstName, updateLastName } =
  userSlice.actions;
export default userSlice.reducer;
