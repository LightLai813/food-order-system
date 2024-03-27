import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default ({ 
    children,
    className = '',
    style,
    displayCompletely = false,
    closeWindow
} : {
    children: React.ReactNode,
    className?: String,
    style?: React.CSSProperties,
    displayCompletely?: boolean,
    closeWindow?: () => void
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current 
                && !containerRef.current.contains(event.target as Node)
                && closeWindow
            ) {
                closeWindow();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useLayoutEffect(() => {
        if (!displayCompletely || !containerRef.current) return;

        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let [offsetX, offsetY] = [0, 0];
        const boundaryPadding = 20;

        if (left < boundaryPadding) {
            offsetX = 20 - left;
        } else if (left + width + boundaryPadding > viewportWidth) {
            offsetX = viewportWidth - (left + width + boundaryPadding);
        } 

        if (top < boundaryPadding) {
            offsetY = 20 - top;
        } else if (top + height + boundaryPadding > viewportHeight) {
            offsetY = viewportWidth - (top + height + boundaryPadding);
        } 

        setTransform(`translate(${offsetX}px, ${offsetY}px)`);
    }, []);

    return ReactDOM.createPortal(
        <div
            ref={containerRef}
            className={`popup-container ${className}`}
            style={{
                transform,
                ...style
            }}
        >{children}</div>,
        document.body
    )
}
