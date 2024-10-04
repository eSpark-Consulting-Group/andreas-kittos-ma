// cartSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'category',
  initialState: {
    cartId: null,
    cartItems: [],
    cartTotal1: null,
    cartTotal2: null,
  },
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartTotal: (state, action) => {
      if (action.payload == null) {
        state.cartTotal1 = null;
        state.cartTotal2 = null;
      } else if (action.payload.total2) {
        state.cartTotal1 = action.payload.total1;
        state.cartTotal2 = action.payload.total2;
      } else {
        state.cartTotal1 = action.payload.total1;
        if (state.cartTotal2) {
          state.cartTotal2 = null;
        }
      }
    },
    // Other reducers go here
  },
});

export const {setCartId, setCartItems, setCartTotal} = cartSlice.actions;

export default cartSlice.reducer;
