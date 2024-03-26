import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: false,
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
