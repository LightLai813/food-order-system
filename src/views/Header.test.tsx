import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next'; // 

i18n.init({
    lng: 'en',
    resources: {
        en: {
            translation: {
                page_menu: 'menu',
                page_history: 'history',
                tw: '中文',
                en: 'English',
            },
        },
        tw: {
            translation: {
                page_menu: '菜單',
                page_history: '歷史訂單'
            },
        },
    },
});

import Header from './Header';

describe('Header Component', () => {
    it('changes URL to /#/menu when menu link is clicked', () => {
        const { getByTestId } = render(
            <I18nextProvider i18n={i18n}>
                <Header />
            </I18nextProvider>,
            { wrapper: HashRouter }
        );

        const menuLink = getByTestId('page_menu');
        fireEvent.click(menuLink);
        expect(window.location.hash).toEqual('#/menu');
    });

    it('changes URL to /#/history when history link is clicked', () => {
        const { getByTestId } = render(
            <I18nextProvider i18n={i18n}>
                <Header />
            </I18nextProvider>,
            { wrapper: HashRouter }
        );

        const historyLink = getByTestId('page_history');
        fireEvent.click(historyLink);
        expect(window.location.hash).toEqual('#/history');
    });
});
