import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInterface } from '../interfaces/user.interface';
import { Cookie } from '../utils/cookies';

const initialState: UserInterface = {
  email: localStorage.getItem('email'),
  token: Cookie.getCookies('Token'),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    assignUser: (state, action: PayloadAction<UserInterface>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    unassignUser: (state) => {
      state.email = null;
      state.token = null;
    }
  }
});

export const { assignUser, unassignUser } = userSlice.actions;

export default userSlice.reducer;