// userSlice.ts
import {createSlice} from '@reduxjs/toolkit';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  socialId: string;
  profileImage: string;
  userName: string;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {token: '', userData: null},
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    // Other reducers go here
  },
});

export const {setUserToken, setUserData} = userSlice.actions;

export default userSlice.reducer;
