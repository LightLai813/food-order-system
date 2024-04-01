import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: boolean = false;

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (
            state: boolean, 
            action: PayloadAction<boolean>
        ) => action.payload
    }
});

export const { 
    setLoading
} = loadingSlice.actions;

export default loadingSlice.reducer;
