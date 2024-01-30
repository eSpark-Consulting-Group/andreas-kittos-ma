// store.js
import {configureStore} from '@reduxjs/toolkit';

import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    // Other reducers go here
  },
});

export default store;
