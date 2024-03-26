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
            <div className="fos-error-boundary-messenge">{error.message}</div>
            <pre className="fos-error-boundary-stack">{error.stack}</pre>
        </>
    );
};
