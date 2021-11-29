import { configureStore } from '@reduxjs/toolkit';
import canvastodoSlice from '../features/canvastodo/canvastodoSlice';

export const store = configureStore({
  reducer: {
    [canvastodoSlice.name]: canvastodoSlice.reducer,
  },
});