import { setLoading } from './loadingSlice';
import loadingReducer, { initialState } from './loadingSlice';

describe('loading reducer', () => {
    it('should handle setLoading', () => {
        const previousState = true;
        const action = setLoading(false);
        const newState = loadingReducer(previousState, action);
        expect(newState).toEqual(false);
    });
});
