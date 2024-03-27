// cartSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'category',
  initialState: {cartId: null, cartItems: [], cartTotal: null},
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
    // Other reducers go here
  },
});

export const {setCartId, setCartItems, setCartTotal} = cartSlice.actions;

export default cartSlice.reducer;
