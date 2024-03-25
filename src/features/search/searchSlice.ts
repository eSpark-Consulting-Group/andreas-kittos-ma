// searchSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {searchedText: '', searchItems: []},
  reducers: {
    setSearchText: (state, action) => {
      state.searchedText = action.payload;
    },
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
    // Other reducers go here
  },
});

export const {setSearchText, setSearchItems} = searchSlice.actions;

export default searchSlice.reducer;
