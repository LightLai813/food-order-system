import { uniqueID } from './uniqueID';

const localStorageMock = (() => {
    let store: { [key: string]: string } = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('uniqueID function', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should return a unique ID from localStorage if it exists', () => {
        const testID = 'test-id';
        localStorage.setItem('userID', testID);

        expect(uniqueID()).toBe(testID);
    });

    it('should generate and return a new unique ID if localStorage is empty', () => {
        const id = uniqueID();
        expect(id).toBeTruthy();
        expect(typeof id).toBe('string');
        expect(id).toHaveLength(36);
        expect(localStorage.getItem('userID')).toBe(id);
    });
});
