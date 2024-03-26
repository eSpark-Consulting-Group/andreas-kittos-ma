// userSlice.ts
import {createSlice} from '@reduxjs/toolkit';

export type User = {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  imageKey: null;
  email: string;
  phoneNumber: string;
  userStatus: string;
  role: string;
  isVerified: boolean;
  socialId: string;
  displayName: string | null;
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
