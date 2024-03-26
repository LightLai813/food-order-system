import { configureStore } from '@reduxjs/toolkit';

import itemReducer from './itemSlice';
import cartReducer from './cartSlice';
import loadingReducer from './loadingSlice';
import alertReducer from './alertSlice';

export const store = configureStore({
    reducer: {
        item: itemReducer,
        cart: cartReducer,
        loading: loadingReducer,
        alert: alertReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
