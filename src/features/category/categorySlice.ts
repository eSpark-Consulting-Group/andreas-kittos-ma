// categorySlice.ts
import {createSlice} from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {categories: null},
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    // Other reducers go here
  },
});

export const {setCategories} = categorySlice.actions;

export default categorySlice.reducer;
