import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/hooks';

import { Category, FoodItem } from '@/utils/constants/items.constants';

import QuantityModifier from '@/components/QuantityModifier';
import PopUpWindow from '@/components/PopUpWindow';
import Button from '@/components/Button';
import { addToCart } from '@/store/cartSlice';

type quantityModifierProperties = {
    pos: {
        x: number,
        y: number
    }
}

function ItemBlock({ id, name, pic }: FoodItem) {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();

    const [showQuantityModifier, setShowQuantityModifier] = useState<quantityModifierProperties|null>(null);
    const buyQuantity = useRef<number>(1);

    const handleShowQuantityModifier = (e: React.MouseEvent<HTMLDivElement>) => {
        buyQuantity.current = 1;
        setShowQuantityModifier({
            pos: {
                x: e.clientX - 160,
                y: e.clientY - 90
            }
        });
    }

    const handleCloseQuantityModifier = () => {
        setShowQuantityModifier(null);
    }

    const handleQuantityUpdate = (newValue: number) => {
        buyQuantity.current = newValue;
    }

    const handleAddCart = () => {
        dispatch(
            addToCart({
                id,
                quantity: buyQuantity.current
            })
        );
        handleCloseQuantityModifier();
    }

    return (
        <div key={id}>
            <div 
                className="itemPic"
                style={{
                    backgroundImage: `url(${pic})`
                }}
            />
            <p className="itemName">{name[i18n.language as ('tw'|'en')]}</p>
            <Button
                onClick={handleShowQuantityModifier}
                style={{
                    marginTop: 'auto'
                }}
            >{t('button_buy')}</Button>
            {
                showQuantityModifier
                && (
                    <PopUpWindow
                        displayCompletely={true}
                        style={{
                            left: `${showQuantityModifier.pos.x}px`,
                            top: `${showQuantityModifier.pos.y}px`
                        }}
                        closeWindow={handleCloseQuantityModifier}
                    >
                        <div className="addCartBlock">
                            <QuantityModifier callback={handleQuantityUpdate} />
                            <Button 
                                color="gray"
                                onClick={handleCloseQuantityModifier}
                            >{t('button_cancel')}</Button>
                            <Button
                                onClick={handleAddCart}
                            >{t('button_addCart')}</Button>
                        </div>
                        
                    </PopUpWindow>
                )
            }
        </div>
    )
}

function CategoryBlock({ target } : { target: Category }) {
    const { i18n } = useTranslation();
    const items = useAppSelector((state) => state.item.items);

    return (
        <div className="category">
            <h3>{target.name[i18n.language as ('tw'|'en')]}</h3>
            <div className="items">
                {
                    items
                        .filter(({ category }) => category === target.id)
                        .map((item) => (
                            <ItemBlock key={item.id} {...item} /> 
                        ))
                }
            </div>
        </div>
    )
}

export default () => {
    const categories = useAppSelector((state) => state.item.categories);

    return (
        <div className="menu">
            {
                categories.map((category) => <CategoryBlock key={category.id} target={category} />)
            }
        </div>
    )
}
