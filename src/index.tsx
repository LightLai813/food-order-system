import './i18n';
import './style.scss';

import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Provider } from 'react-redux';
import { store } from './store';
import fetchCategorisAndItems from './store/fetchCategorisAndItems';

const Header = React.lazy(() => import('./views/Header'));
const Menu = React.lazy(() => import('./views/Menu'));
const History = React.lazy(() => import('./views/History'));
const Cart = React.lazy(() => import('./views/Cart'));
const Error = React.lazy(() => import('./views/Error'));

const Loading = React.lazy(() => import('./components/Loading'));
const Alert = React.lazy(() => import('./components/Alert'));

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);

store.dispatch(fetchCategorisAndItems());

root.render(
    <ErrorBoundary
        FallbackComponent={Error}
    >
        <Provider store={store}>
            <Router>
                <Suspense>
                    <Header />
                </Suspense>
                <Routes>
                    <Route 
                        path="menu" 
                        element={(
                            <Suspense>
                                <Menu />
                            </Suspense>
                        )} 
                    />
                    <Route 
                        path="history" 
                        element={(
                            <Suspense>
                                <History />
                            </Suspense>
                        )} 
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/menu" replace />}
                    />
                </Routes>
            </Router>
            <Suspense>
                <Cart />
            </Suspense>
            <Suspense>
                <Alert />
            </Suspense>
            <Suspense>
                <Loading />
            </Suspense>
        </Provider>
    </ErrorBoundary>
);
