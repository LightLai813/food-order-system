import { Dispatch } from 'redux';
import { setCategories, setFoodItems } from './itemSlice';

export default () => {
    return async (dispatch: Dispatch) => {
        try {
            // 使用 Promise.all 發送兩個 API 請求並等待它們的回應
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

        } catch (error) {
            throw error;
        };
    };
}

