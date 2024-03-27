// checkoutSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    shipAddress: null,
    addressId: null,
    checkoutNote: '',
    searchedPlaces: null,
  },
  reducers: {
    setShipAddress: (state, action) => {
      state.shipAddress = action.payload;
    },
    setShipAddressId: (state, action) => {
      state.addressId = action.payload;
    },
    setCheckoutNote: (state, action) => {
      state.checkoutNote = action.payload;
    },
    setSearchPlaces: (state, action) => {
      state.searchedPlaces = action.payload;
    },
    // Other reducers go here
  },
});

export const {
  setShipAddress,
  setShipAddressId,
  setCheckoutNote,
  setSearchPlaces,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
