import React, { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks';

import PopUpWindow from '@/components/PopUpWindow';
import { useTranslation } from 'react-i18next';
import { FoodItem } from '@/utils/constants/items.constants';
import QuantityModifier from '@/components/QuantityModifier';
import { updateQuantity, removeItem, clearCart } from '@/store/cartSlice';
import Button from '@/components/Button';
import { setLoading } from '@/store/loadingSlice';
import { setAlert } from '@/store/alertSlice';
import { uniqueID } from '@/utils/services/uniqueID';

function ItemBlock({
    id,
    quantity
}: {
    id: string,
    quantity: number
}) {
    const { i18n } = useTranslation();
    const dispatch = useAppDispatch();

    const items = useAppSelector((state) => state.item.items);

    const targetItem: FoodItem|undefined = useMemo(() => items.find((item) => item.id === id), [id, items]);

    const handleQuantityUpdate = (newValue: number) => {
        dispatch(
            updateQuantity({
                id,
                quantity: newValue
            })
        );
    }

    const handleRemove = () => {
        dispatch(
            removeItem(id)
        );
    }

    if (!targetItem) return null;

    return (
        <div className="cartItem">
            <div className="cartItemPic"
                style={{
                    backgroundImage: `url(${targetItem.pic})`
                }}
            />
            <div className="cartItemName">{targetItem.name[i18n.language]}</div>
            <QuantityModifier 
                value={quantity}
                callback={handleQuantityUpdate}
            />
            <div 
                className="cartRemoveButton"
                onClick={handleRemove}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 24 24" >
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#AAA" />
                </svg>
            </div>
        </div>
    )
}

export default ({
    hideCartList
}: {
    hideCartList: () => void
}) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector((state) => state.cart.items);

    const handleCheckout = async () => {
        dispatch(
            setLoading(true)
        );
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'content-type': 'text/plain'
            },
            body: JSON.stringify({
                userId: uniqueID(),
                order: cartItems
            })
        });

        const result = await response.json();

        console.log({ result });

        if (result.message === 'success') {
            dispatch(
                clearCart()
            );
            dispatch(
                setLoading(false)
            );
            hideCartList();

            dispatch(
                setAlert(t('msg_checkoutSuccess'))
            );
        }
    }

    return (
        <PopUpWindow
            className="cartList"
            closeWindow={hideCartList}
        >
            <h2>{t('title_cart')}</h2>
            <div className="cartItemContainer">
                {
                    cartItems.length === 0
                        ? (
                            <div className="emptyCart">{t('msg_emptyCart')}</div>
                        )
                        : cartItems.map((item) => (<ItemBlock key={item.id} {...item} />))
                }
            </div>
            <div className="cartButtons">
                <Button 
                    color="gray"
                    onClick={hideCartList}
                >{t('button_cancel')}</Button>
                <Button
                    onClick={handleCheckout}
                >{t('button_checkout')}</Button>
            </div>
        </PopUpWindow>
    )
}