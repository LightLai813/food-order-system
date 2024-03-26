import './i18n';
import './style.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Provider } from 'react-redux';
import { store } from './store';

const Header = React.lazy(() => import('./views/Header'));
const Error = React.lazy(() => import('./views/Error'));

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

root.render(
    <ErrorBoundary
        FallbackComponent={Error}
    >
        <Provider store={store}>
        <Router>
            <Header />
            <Routes>
                <Route path="menu" element={<div />} />
                <Route path="history" element={<div />} />
                <Route
                    path="*"
                    element={<Navigate to="/menu" replace />}
                />
            </Routes>
        </Router>
        </Provider>
    </ErrorBoundary>
);
