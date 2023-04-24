import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import products_ru from './ru/products.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            products: typeof products_ru;
        };
    }
}

const resources = {
    en: {
        products: products_ru,
    },
    ru: {
        products: products_ru,
    },
};

i18n.use(initReactI18next).init({
    debug: process.env.NODE_ENV === 'development',
    resources,
    lng: 'ru',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
