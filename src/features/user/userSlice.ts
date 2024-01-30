// userSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {token: ''},
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    // Other reducers go here
  },
});

export const {setUserToken} = userSlice.actions;

export default userSlice.reducer;
