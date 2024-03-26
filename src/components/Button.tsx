import React from 'react';

interface Button {
    children: React.ReactNode,
    color?: 'primary'|'gray'
    className?: String,
    style?: React.CSSProperties,
    onClick?:  (e: React.MouseEvent<HTMLDivElement>) => void
}

export default ({
    children,
    color = 'primary',
    className = '',
    style,
    onClick
}: Button ) => {
    return (
        <div 
            className={`button button-${color} ${className}`}
            onClick={onClick}
            style={style}
        >{children}</div>
    )
}