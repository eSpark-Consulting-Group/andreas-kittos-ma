// staticSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const staticSlice = createSlice({
  name: 'static',
  initialState: {pPolicy: '', aboutUs: ''},
  reducers: {
    setPolicy: (state, action) => {
      state.pPolicy = action.payload;
    },
    setAboutUs: (state, action) => {
      state.aboutUs = action.payload;
    },
    // Other reducers go here
  },
});

export const {setPolicy, setAboutUs} = staticSlice.actions;

export default staticSlice.reducer;
