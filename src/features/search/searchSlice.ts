// searchSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchedText: '',
    searchItems: [],
    categorySearch: '',
    categorySearchItems: [],
    searchRegion: {
      latitude: 34.6826183,
      longitude: 33.0306031,
      latitudeDelta: 0.05, // Adjust this value to change the zoom level
      longitudeDelta: 0.05, // Adjust this value to change the zoom level
    },
    searchLoader: false,
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
    setSearchRegion: (state, action) => {
      state.searchRegion = action.payload;
    },
    setSearchLoader: (state, action) => {
      state.searchLoader = action.payload;
    },
    // Other reducers go here
  },
});

export const {
  setSearchText,
  setSearchItems,
  setSearchCatText,
  setSearchCatItems,
  setSearchRegion,
  setSearchLoader,
} = searchSlice.actions; //the setters for store

export default searchSlice.reducer;
