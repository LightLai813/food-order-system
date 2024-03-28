import React from 'react';

interface Button {
    children: React.ReactNode,
    disable?: boolean,
    color?: 'primary'|'gray'
    className?: String,
    style?: React.CSSProperties,
    onClick?:  (e: React.MouseEvent<HTMLDivElement>) => void
}

export default ({
    children,
    disable = false,
    color = 'primary',
    className = '',
    style,
    onClick
}: Button ) => {
    return (
        <div 
            className={`button button-${color} ${className} ${disable ? 'button-disable' : ''}`}
            onClick={onClick}
            style={style}
        >{children}</div>
    )
}