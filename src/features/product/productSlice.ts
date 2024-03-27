// productSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {favorites: []},
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    // Other reducers go here
  },
});

export const {setFavorites} = productSlice.actions;

export default productSlice.reducer;
