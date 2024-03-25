// store.js
import {configureStore} from '@reduxjs/toolkit';

import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/user/userSlice';
import categorySlice from '../features/category/categorySlice';
import productSlice from '../features/product/productSlice';
import staticSlice from '../features/statics/staticSlice';
import cartSlice from '../features/cart/cartSlice';
import searchSlice from '../features/search/searchSlice';
import checkoutSlice from '../features/checkout/checkoutSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    category: categorySlice,
    product: productSlice,
    static: staticSlice,
    cart: cartSlice,
    search: searchSlice,
    checkout: checkoutSlice,
    // Other reducers go here
  },
});

export default store;
