import Dashboard from 'components/Dashboard';
import {EUserRole} from './roles';
import {Empty} from 'antd';
import Providers from 'components/Providers';
import ProviderDetails from 'components/Providers/ProviderDetails/ProductDetails';
import Products from 'components/Products';
import ProductsWithQualityModel from 'components/Products/WithQualityModel';
import ProductsWithoutQualityModel from 'components/Products/WithoutQualityModel';
import Transfer from 'components/Products/Transfer';
import ProductsWithDocuments from 'components/Products/WithDocuments';
import ProductDetails from 'components/Products/ProductDetails/ProductDetails';
import Models from 'components/Models';
import ModelDetails from 'components/Models/ModelDetails';
import Tasks from 'components/Tasks';
import TaskDetails from 'components/Tasks/TaskDetails';
import {Navigate} from 'react-router-dom';

export enum RoutePath {
    Dashboard = '/',
    Settings = '/settings',
    // Поставщики:
    Providers = '/providers',
    ProviderDetails = '/providers/:id',
    // Товары:
    Products = '/products',
    ProductsWithModels = '/products/with-models',
    ProductsWithoutModels = '/products/without-models',
    ProductsTransfer = '/products/transfer',
    ProductsDocuments = '/products/documents/',
    ProductDetails = '/products/:id',
    // Модели качества:
    Models = '/models',
    ModelsDetails = '/models/:id',
    // Задачи:
    Tasks = '/tasks',
    TaskDetails = '/tasks/:id',
}

export interface AppRoute {
    path: RoutePath;
    element: JSX.Element;
    enabledRoles: EUserRole[];
    childRoutes?: AppRoute[];
}

export const appRoutes: AppRoute[] = [
    {
        path: RoutePath.Settings,
        element: <Empty />,
        enabledRoles: [
            EUserRole.Admin,
            EUserRole.KeyUser,
            EUserRole.QE,
            EUserRole.Supplier,
            EUserRole.SQM,
            EUserRole.InternalUser,
            EUserRole.ServiceProvider,
        ],
    },
    {
        path: RoutePath.Providers,
        element: <Providers />,
        enabledRoles: [
            EUserRole.Admin,
            EUserRole.KeyUser,
            EUserRole.QE,
            EUserRole.Supplier,
            EUserRole.SQM,
            EUserRole.InternalUser,
        ],
        childRoutes: [
            {
                path: RoutePath.ProviderDetails,
                element: <ProviderDetails />,
                enabledRoles: [
                    EUserRole.Admin,
                    EUserRole.KeyUser,
                    EUserRole.QE,
                    EUserRole.Supplier,
                    EUserRole.SQM,
                    EUserRole.InternalUser,
                    EUserRole.ServiceProvider,
                ],
            },
        ],
    },
    {
        path: RoutePath.Products,
        element: <Products />,
        enabledRoles: [
            EUserRole.Admin,
            EUserRole.KeyUser,
            EUserRole.QE,
            EUserRole.Supplier,
            EUserRole.SQM,
            EUserRole.InternalUser,
            EUserRole.ServiceProvider,
        ],
        childRoutes: [
            {
                path: RoutePath.ProductsWithModels,
                element: <ProductsWithQualityModel />,
                enabledRoles: [
                    EUserRole.Admin,
                    EUserRole.KeyUser,
                    EUserRole.QE,
                    EUserRole.Supplier,
                    EUserRole.SQM,
                    EUserRole.InternalUser,
                    EUserRole.ServiceProvider,
                ],
            },
            {
                path: RoutePath.ProductsWithoutModels,
                element: <ProductsWithoutQualityModel />,
                enabledRoles: [EUserRole.Admin, EUserRole.KeyUser, EUserRole.QE],
            },
            {
                path: RoutePath.ProductsTransfer,
                element: <Transfer />,
                enabledRoles: [EUserRole.Admin, EUserRole.KeyUser, EUserRole.QE],
            },
            {
                path: RoutePath.ProductsDocuments,
                element: <ProductsWithDocuments />,
                enabledRoles: [
                    EUserRole.Admin,
                    EUserRole.KeyUser,
                    EUserRole.QE,
                    EUserRole.Supplier,
                    EUserRole.SQM,
                    EUserRole.InternalUser,
                    EUserRole.ServiceProvider,
                ],
            },
            {
                path: RoutePath.ProductDetails,
                element: <ProductDetails />,
                enabledRoles: [
                    EUserRole.Admin,
                    EUserRole.KeyUser,
                    EUserRole.QE,
                    EUserRole.Supplier,
                    EUserRole.SQM,
                    EUserRole.InternalUser,
                    EUserRole.ServiceProvider,
                ],
            },
            {
                path: RoutePath.Products,
                element: <Navigate to={RoutePath.ProductsWithModels} />,
                enabledRoles: [
                    EUserRole.Admin,
                    EUserRole.KeyUser,
                    EUserRole.QE,
                    EUserRole.Supplier,
                    EUserRole.SQM,
                    EUserRole.InternalUser,
                    EUserRole.ServiceProvider,
                ],
            },
        ],
    },
    {
        path: RoutePath.Models,
        element: <Models />,
        enabledRoles: [EUserRole.Admin, EUserRole.KeyUser, EUserRole.QE, EUserRole.SQM, EUserRole.InternalUser],
        childRoutes: [
            {
                path: RoutePath.ModelsDetails,
                element: <ModelDetails />,
                enabledRoles: [EUserRole.Admin, EUserRole.KeyUser, EUserRole.QE, EUserRole.SQM, EUserRole.InternalUser],
            },
        ],
    },
    {
        path: RoutePath.Tasks,
        element: <Tasks />,
        enabledRoles: [
            EUserRole.Admin,
            EUserRole.KeyUser,
            EUserRole.QE,
            EUserRole.Supplier,
            EUserRole.SQM,
            EUserRole.InternalUser,
            EUserRole.ServiceProvider,
        ],
        childRoutes: [
            {
                path: RoutePath.TaskDetails,
                element: <TaskDetails />,
                enabledRoles: [
                    EUserRole.Admin,
                    EUserRole.KeyUser,
                    EUserRole.QE,
                    EUserRole.Supplier,
                    EUserRole.SQM,
                    EUserRole.InternalUser,
                    EUserRole.ServiceProvider,
                ],
            },
        ],
    },
    {
        path: RoutePath.Dashboard,
        element: <Dashboard />,
        enabledRoles: [
            EUserRole.Admin,
            EUserRole.KeyUser,
            EUserRole.QE,
            EUserRole.Supplier,
            EUserRole.SQM,
            EUserRole.InternalUser,
            EUserRole.ServiceProvider,
        ],
    },
];
