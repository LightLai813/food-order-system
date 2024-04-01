import reducer, { initialState, addToCart, updateQuantity, removeItem, clearCart, buyAgain, showCartList } from './cartSlice';

describe('cart slice', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle addToCart', () => {
        const state = reducer(initialState, addToCart({ id: '1', quantity: 2 }));
        expect(state.items).toEqual([{ id: '1', quantity: 2 }]);
    });

    it('should handle updateQuantity', () => {
        let state = reducer(initialState, addToCart({ id: '1', quantity: 2 }));
        state = reducer(state, updateQuantity({ id: '1', quantity: 5 }));
        expect(state.items).toEqual([{ id: '1', quantity: 5 }]);
    });

    it('should handle removeItem', () => {
        let state = reducer(initialState, addToCart({ id: '1', quantity: 2 }));
        state = reducer(state, removeItem('1'));
        expect(state.items).toEqual([]);
    });

    it('should handle clearCart', () => {
        let state = reducer(initialState, addToCart({ id: '1', quantity: 2 }));
        state = reducer(state, clearCart());
        expect(state.items).toEqual([]);
    });

    it('should handle buyAgain', () => {
        const items = [{ id: '1', quantity: 2 }, { id: '2', quantity: 3 }];
        const state = reducer(initialState, buyAgain(items));
        expect(state.items).toEqual(items);
    });

    it('should handle showCartList', () => {
        let state = reducer(initialState, showCartList(true));
        expect(state.cartListVisible).toEqual(true);
        state = reducer(state, showCartList(false));
        expect(state.cartListVisible).toEqual(false);
    });

    // Add more test cases as needed
});
