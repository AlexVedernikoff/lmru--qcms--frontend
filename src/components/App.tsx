import {Empty} from 'antd';
import {Grid, GridItem} from 'fronton-react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {APP_ROUTES, MODELS_ROUTES, PRODUCTS_ROUTES, PROVIDER_ROUTES, TASKS_ROUTES} from '../common/consts';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import ProductsWithQualityModel from './Products/WithQualityModel';
import ProductsWithoutQualityModel from './Products/WithoutQualityModel';
import ProductsWithDocuments from './Products/WithDocuments';
import ProductDetails from './Products/ProductDetails/ProductDetails';
import ProviderDetails from './Providers/ProviderDetails/ProductDetails';
import TaskDetails from './Tasks/TaskDetails/TaskDetails';
import ModelDetails from './Models/ModelDetails';
import Transfer from './Products/Transfer';
import Providers from './Providers';
import Products from './Products';
import Models from './Models';
import Tasks from './Tasks';
import Dashboard from './Dashboard';

const App: React.FC = () => (
    <Grid areas={['header header header', 'aside main spacer']} columnGap={16} columns="auto 1fr 12px">
        <GridItem area="header">
            <Header />
        </GridItem>

        <GridItem area="aside">
            <Sidebar />
        </GridItem>

        <GridItem area="main">
            <br />
            <Routes>
                <Route path={APP_ROUTES.dashboard} element={<Dashboard />} />
                <Route path={APP_ROUTES.providers} element={<Providers />} />
                <Route path={PROVIDER_ROUTES.details} element={<ProviderDetails />} />
                <Route path={APP_ROUTES.products} element={<Products />}>
                    <Route path={PRODUCTS_ROUTES.withModels} element={<ProductsWithQualityModel />} />
                    <Route path={PRODUCTS_ROUTES.withoutModels} element={<ProductsWithoutQualityModel />} />
                    <Route path={PRODUCTS_ROUTES.transfer} element={<Transfer />} />
                    <Route path={PRODUCTS_ROUTES.documents} element={<ProductsWithDocuments />} />

                    <Route path={PRODUCTS_ROUTES.details} element={<ProductDetails />} />

                    <Route path={APP_ROUTES.products} element={<Navigate to={PRODUCTS_ROUTES.withModels} />} />
                </Route>
                <Route path={APP_ROUTES.tasks} element={<Tasks />}>
                    <Route path={TASKS_ROUTES.details} element={<TaskDetails />} />
                </Route>
                <Route path={APP_ROUTES.models} element={<Models />}>
                    <Route path={MODELS_ROUTES.details} element={<ModelDetails />} />
                </Route>
                <Route path={APP_ROUTES.settings} element={<Empty />} />

                <Route path="*" element={<Navigate to={APP_ROUTES.dashboard} />} />
            </Routes>
        </GridItem>

        <GridItem area="spacer">
            <span />
        </GridItem>
    </Grid>
);

export default App;
