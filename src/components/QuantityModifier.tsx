import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

interface QuantityModifier {
    value?: number,
    min?: number,
    max?: number,
    callback?: (newValue: number) => void
}

export default ({
    value = 1,
    min = 1,
    max = 99,
    callback
}: QuantityModifier) => {
    const [inputValue, setInputValue] = useState(value);
    const [quantity, setQuantity] = useState(value);

    const handleMinus = (e: React.MouseEvent) => {
        if (quantity > min) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handlePlus = (e: React.MouseEvent) => {
        if (quantity < max) {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const checkValue = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = parseInt(e.target.value);
        if (isNaN(newValue)) {
            setInputValue(quantity);
            return;
        }

        if (newValue < 1) newValue = 1;
        if (newValue > 99) newValue = 99;
        
        setQuantity(newValue);
    };

    useEffect(() => {
        setInputValue(quantity);
        if (callback) callback(quantity);
    }, [quantity])

    return (
        <div className="quantitySelector">
            <div 
                className="button-minus"
                onClick={handleMinus}
            >
                <svg fill="#777" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 83 83">
                    <path d="M81,36.166H2c-1.104,0-2,0.896-2,2v6.668c0,1.104,0.896,2,2,2h79c1.104,0,2-0.896,2-2v-6.668 C83,37.062,82.104,36.166,81,36.166z" />
                </svg>
            </div>
            <input 
                type="number"
                value={inputValue}
                onChange={handleChange}
                onBlur={checkValue}
                min={min}
                max={max}
            />
            <div 
                className="button-plus"
                onClick={handlePlus}
            >
                <svg fill="#777" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                    <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}
