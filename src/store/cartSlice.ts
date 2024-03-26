import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateIn } from 'immutable';

interface CartState {
    items: Array<{
        id: String,
        quantity: Number
    }>
}

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        addToCart: (
            state: CartState, 
            action: PayloadAction<{
                id: String,
                quantity: Number
            }>
        ) => {
            const itemIndex = state.items.findIndex(({ id }) => action.payload.id === id);
            if (itemIndex !== -1) {
                return updateIn(state, ['items', itemIndex, 'quantity'], () => state.items[itemIndex].quantity + action.payload.quantity)
            }
            return updateIn(state, ['items', state.items.length], () => action.payload);
        },
    }
});

export const { 
    addToCart
} = cartSlice.actions;

export default cartSlice.reducer;
