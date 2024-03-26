import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateIn } from 'immutable';

import { Category, FoodItem } from '@/utils/constants/items.constants';

interface ItemState {
    categories: Array<Category>
    items: Array<FoodItem>
}

const initialState: ItemState = {
    categories: [],
    items: []
};

const itemSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setCategories: (
            state: ItemState, 
            action: PayloadAction<Array<Category>>
        ) => {
            console.log(action.payload);
            return updateIn(state, ['categories'], () => action.payload)
        },
        setFoodItems: (
            state: ItemState, 
            action: PayloadAction<Array<FoodItem>>
        ) => updateIn(state, ['items'], () => action.payload),
    }
});

export const { 
    setCategories, 
    setFoodItems
} = itemSlice.actions;

export default itemSlice.reducer;
