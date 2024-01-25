// store.js
import {configureStore} from '@reduxjs/toolkit';

import globalReducer from '../features/theme/themeSlice';

const store = configureStore({
  reducer: {
    theme: globalReducer,
    // Other reducers go here
  },
});

export default store;
