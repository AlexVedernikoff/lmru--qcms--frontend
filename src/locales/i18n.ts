import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import products_ru from './ru/products.json';
import models_ru from './ru/models.json';
import tasks_ru from './ru/tasks.json';
import tasks_en from './en/tasks.json';
import dashboard_ru from './ru/dashboard.json';
import dashboard_en from './en/dashboard.json';
import providers_ru from './ru/providers.json';
import providers_en from './en/providers.json';
import sidebar_ru from './ru/sidebar.json';
import checkbox_ru from './ru/checkbox.json';
import checkbox_en from './en/checkbox.json';
import files_ru from './ru/files.json';

const resources = {
    en: {
        products: products_ru,
        models: models_ru,
        providers: providers_en,
        tasks: tasks_en,
        sidebar: sidebar_ru,
        dashboard: dashboard_en,
        checkbox: checkbox_en,
        files: files_ru,
    },
    ru: {
        products: products_ru,
        models: models_ru,
        providers: providers_ru,
        tasks: tasks_ru,
        sidebar: sidebar_ru,
        dashboard: dashboard_ru,
        checkbox: checkbox_ru,
        files: files_ru,
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
