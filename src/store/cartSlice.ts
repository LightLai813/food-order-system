import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateIn, removeIn } from 'immutable';

interface CartState {
    items: Array<{
        id: string,
        quantity: number
    }>,
    cartListVisible: boolean
}

const initialState: CartState = {
    items: [],
    cartListVisible: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state: CartState, 
            action: PayloadAction<{
                id: string,
                quantity: number
            }>
        ) => {
            const itemIndex = state.items.findIndex(({ id }) => action.payload.id === id);
            if (itemIndex !== -1) {
                return updateIn(state, ['items', itemIndex, 'quantity'], () => state.items[itemIndex].quantity + action.payload.quantity)
            }
            return updateIn(state, ['items', state.items.length], () => action.payload);
        },
        updateQuantity: (
            state: CartState, 
            action: PayloadAction<{
                id: string,
                quantity: number
            }>
        ) => updateIn(state, ['items', state.items.findIndex(({ id }) => action.payload.id === id), 'quantity'], () => action.payload.quantity),
        removeItem: (
            state: CartState, 
            action: PayloadAction<string>
        ) => removeIn(state, ['items', state.items.findIndex(({ id }) => action.payload === id)]),
        clearCart: (
            state: CartState
        ) => updateIn(state, ['items'], () => []),
        buyAgain: (
            state: CartState,
            action: PayloadAction<
                Array<{
                    id: string,
                    quantity: number
                }>
            >
        ) => updateIn(state, ['items'], () => action.payload),
        showCartList: (
            state: CartState,
            action: PayloadAction<boolean>
        ) => updateIn(state, ['cartListVisible'], () => action.payload),
    }
});

export const { 
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    buyAgain,
    showCartList
} = cartSlice.actions;

export default cartSlice.reducer;
