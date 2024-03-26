import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default ({ 
    children,
    className = '',
    style,
    closeWindow
} : {
    children: React.ReactNode,
    className?: String,
    style?: React.CSSProperties,
    closeWindow?: () => void
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (closeWindow) closeWindow();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return ReactDOM.createPortal(
        <div
            ref={containerRef}
            className={`popup-container ${className}`}
            style={style}
        >{children}</div>,
        document.body
    )
}
