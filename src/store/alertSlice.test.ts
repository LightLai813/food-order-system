import reducer, { setAlert } from './alertSlice';

describe('alert slice', () => {
    const initialState = {
        msg: null,
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setAlert', () => {
        const newState = reducer(initialState, setAlert('Test message'));
        expect(newState.msg).toEqual('Test message');
    });
});
