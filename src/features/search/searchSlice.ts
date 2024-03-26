// searchSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchedText: '',
    searchItems: [],
    categorySearch: '',
    categorySearchItems: [],
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchedText = action.payload;
    },
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
    setSearchCatText: (state, action) => {
      state.categorySearch = action.payload;
    },
    setSearchCatItems: (state, action) => {
      state.categorySearchItems = action.payload;
    },
    // Other reducers go here
  },
});

export const {
  setSearchText,
  setSearchItems,
  setSearchCatText,
  setSearchCatItems,
} = searchSlice.actions;

export default searchSlice.reducer;
