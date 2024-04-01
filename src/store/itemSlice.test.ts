import { setCategories, setFoodItems } from './itemSlice';
import itemReducer, { initialState } from './itemSlice';

describe('item reducer', () => {
    it('should handle setCategories', () => {
        const previousState = {
            ...initialState,
            categories: [],
        };

        const newCategory = [{ 
            id: 'category1',
            name: {
                tw: '分類一',
                en: 'Category 1',
            } 
        }, {
            id: 'category2',
            name: {
                tw: '分類二',
                en: 'Category 2',
            }
        }];

        const action = setCategories(newCategory);
        const newState = itemReducer(previousState, action);
        expect(newState.categories).toEqual(newCategory);
    });

    it('should handle setFoodItems', () => {
        const previousState = {
            ...initialState,
            items: []
        };

        const newFoodItem = [{ 
            id: 'item1',
            category: 'category1',
            name: {
                tw: '項目一',
                en: 'Item 1',
            },
            pic: 'https://example.com/item1.jpg'
        }, {
            id: 'item2',
            category: 'category2',
            name: {
                tw: '項目二',
                en: 'Item 2',
            },
            pic: 'https://example.com/item2.jpg'
        }];
        
        const action = setFoodItems(newFoodItem);
        const newState = itemReducer(previousState, action);
        expect(newState.items).toEqual(newFoodItem);
    });
});
