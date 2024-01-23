// userSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {lightTheme: true},
  reducers: {
    setTheme: (state, action) => {
      state.lightTheme = action.payload;
    },
    // Other reducers go here
  },
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
