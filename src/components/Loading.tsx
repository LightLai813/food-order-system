import { useAppSelector } from '@/hooks';
import React from 'react';
import ReactDOM from 'react-dom';

export default () => {
    const isLoading = useAppSelector((state) => state.loading);

    if (!isLoading) return null;
    return ReactDOM.createPortal(
        <div className="loading" />,
        document.body
    )
}