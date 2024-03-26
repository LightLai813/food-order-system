import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateIn } from 'immutable';

interface AlertState {
    msg: string|null
}

const initialState: AlertState = {
    msg: null
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (
            state: AlertState, 
            action: PayloadAction<string|null>
        ) => updateIn(state, ['msg'], () => action.payload)
    }
});

export const { 
    setAlert
} = alertSlice.actions;

export default alertSlice.reducer;
