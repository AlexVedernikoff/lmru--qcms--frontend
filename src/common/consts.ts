export const APP_ROUTES = {
    dashboard: '/',
    providers: '/providers',
    products: '/products',
    tasks: '/tasks',
    models: '/models',
    settings: '/settings',
};

export const PRODUCTS_ROUTES = {
    withModels: `${APP_ROUTES.products}/with-models`,
    withoutModels: `${APP_ROUTES.products}/without-models`,
    transfer: `${APP_ROUTES.products}/transfer`,
    documents: `${APP_ROUTES.products}/documents`,
    details: `${APP_ROUTES.products}/:id`,
};

export const MODELS_ROUTES = {
    details: `${APP_ROUTES.models}/:id`,
};

export const PROVIDER_ROUTES = {
    details: `${APP_ROUTES.providers}/:id`,
};

export const TASKS_ROUTES = {
    details: `${APP_ROUTES.tasks}/:id`,
};