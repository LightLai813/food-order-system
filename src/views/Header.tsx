import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();

    return (
        <header>
            <nav>
            {
                ['menu', 'history'].map((page) => (
                    <Link 
                        className={location.pathname === `/${page}` ? 'active' : ''}
                        key={page} 
                        to={page}
                        data-testid={`page_${page}`}
                    >{t(`page_${page}`)}</Link>
                ))
            }
            </nav>
            <div className="language-switch">
            {
                [{
                    key: 'tw',
                    label: '中文'
                }, {
                    key: 'en',
                    label: 'English'
                }].map(({ key, label }) => (
                    <a 
                        key={key}
                        className={i18n.language === key ? 'active' : ''}
                        onClick={() => {
                            i18n.changeLanguage(key);
                        }}
                    >{label}</a>
                ))
            }
            </div>
        </header>
    )
}
