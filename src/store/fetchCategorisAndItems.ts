import { Dispatch } from 'redux';
import { setCategories, setFoodItems } from './itemSlice';
import { setLoading } from './loadingSlice';

export default () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(
                setLoading(true)
            );
            
            const responses = await Promise.all([
                fetch(`${API_URL}?act=categories`),
                fetch(`${API_URL}?act=items`),
            ]);

            const categories = await responses[0].json();
            const foodItems = await responses[1].json();

            dispatch(
                setCategories(categories)
            );

            dispatch(
                setFoodItems(foodItems)
            );

            dispatch(
                setLoading(false)
            );

        } catch (error) {
            throw error;
        };
    };
}

