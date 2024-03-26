import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        backend: { loadPath: 'https://script.google.com/macros/s/AKfycbzcUoCyZ6_2z8A9G8au9Y1xSZt6Ebrj9sOD5OShPAHrogvGzoZ1ikvNDOlFS_5fYnXc/exec?act=i18n&lng={{lng}}' },
        interpolation: { escapeValue: false },
        react: {
            bindI18n: 'languageChanged',
            bindI18nStore: '',
            transEmptyNodeValue: '',
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
            useSuspense: false,
        },
    });

export default i18n;
