import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = UserSlice.actions;

export default UserSlice.reducer;
