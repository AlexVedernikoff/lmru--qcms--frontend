import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import products_ru from './ru/products.json';
import models_ru from './ru/models.json';
import providers_ru from './ru/providers.json';
import tasks_ru from './ru/tasks.json';
import tasks_en from './en/tasks.json';
import sidebar_ru from './ru/sidebar.json';
import dashboard_ru from './ru/dashboard.json';

const resources = {
    en: {
        products: products_ru,
        models: models_ru,
        providers: providers_ru,
        tasks: tasks_en,
        sidebar: sidebar_ru,
        dashboard: dashboard_ru,
    },
    ru: {
        products: products_ru,
        models: models_ru,
        providers: providers_ru,
        tasks: tasks_ru,
        sidebar: sidebar_ru,
        dashboard: dashboard_ru,
    },
};

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: typeof resources.ru;
    }
}

i18n.use(initReactI18next).init({
    debug: process.env.NODE_ENV === 'development',
    resources,
    lng: 'ru',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
