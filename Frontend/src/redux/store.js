import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/userSlice';

const store = configureStore({
    reducer:{
      auth:authSlice,
    }
});

export default store;
