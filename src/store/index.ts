import { configureStore } from '@reduxjs/toolkit';

import itemReducer from './itemSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        item: itemReducer,
        cart: cartReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
