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
};
