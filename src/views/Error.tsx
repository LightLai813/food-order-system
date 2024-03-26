import React, { useEffect } from 'react';

interface Error {
    error: {
        message: string,
        stack: string
    },
    resetErrorBoundary: () => void
}

export default ({ 
    error, 
    resetErrorBoundary 
}: Error) => {
    return (
        <>
            <div className="error-boundary-messenge">{error.message}</div>
            <pre className="error-boundary-stack">{error.stack}</pre>
        </>
    );
};
