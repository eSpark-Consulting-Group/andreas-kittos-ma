// cartSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'category',
  initialState: {cartId: null, cartItems: []},
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    // Other reducers go here
  },
});

export const {setCartId, setCartItems} = cartSlice.actions;

export default cartSlice.reducer;
