export interface Category {
    id: string,
    name: {[key: 'en'|'tw']: string}
}

export interface FoodItem {
    id: string,
    category: string
    name: {[key: 'en'|'tw']: string},
    pic: string
}