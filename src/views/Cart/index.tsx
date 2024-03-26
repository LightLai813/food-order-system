import React, { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { showCartList } from '@/store/cartSlice';

import List from './List';

function CartIcon({
    onClick
}: {
    onClick: () => void
}) {
    const cartItems = useAppSelector((state) => state.cart.items);

    const sumOfItems = useMemo(() => cartItems.reduce((accumulator, currentItem) => (currentItem.quantity + accumulator), 0), [cartItems]);

    return (
        <div 
            className="cartIcon"
            onClick={onClick}
        >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {
                sumOfItems > 0
                && (
                    <div className="cartItemsSum">{sumOfItems}</div>
                )
            }
        </div>
    )
}

export default () => {
    const dispatch = useAppDispatch();

    const cartListVisible = useAppSelector((state) => state.cart.cartListVisible);

    const handleShowList = () => {
        dispatch(
            showCartList(true)
        );
    }

    const handleHideList = () => {
        dispatch(
            showCartList(false)
        );
    }
    
    return (
        <div className="cart">
            <CartIcon onClick={handleShowList} />
            {
                cartListVisible 
                && (
                    <List hideCartList={handleHideList} />
                )
            }
        </div>
    )
}
