import { combineReducers, configureStore } from '@reduxjs/toolkit';

import itemReducer from './itemSlice';
import cartReducer from './cartSlice';
import loadingReducer from './loadingSlice';
import alertReducer from './alertSlice';

const rootReducer = combineReducers( {
    item: itemReducer,
    cart: cartReducer,
    loading: loadingReducer,
    alert: alertReducer
});

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
