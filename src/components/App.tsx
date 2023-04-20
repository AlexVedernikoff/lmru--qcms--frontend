import {Empty} from 'antd';
import {Grid, GridItem} from 'fronton-react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {APP_ROUTES, PRODUCTS_ROUTES} from '../common/consts';
import Header from './Layout/Header/Header';
import Sidebar from './Layout/Sidebar/Sidebar';
import Products from './Products/Products';
import ProductsDetails from './Products/ProductsDetails/ProductsDetails';

const App: React.FC = () => (
    <Grid areas={['header header', 'aside main']} columnGap={16} columns="1fr 11fr">
        <GridItem area="header">
            <Header />
        </GridItem>

        <GridItem area="aside">
            <Sidebar />
        </GridItem>

        <GridItem area="main">
            <br />
            <Routes>
                <Route path={APP_ROUTES.dashboard} element={<Empty />} />
                <Route path={APP_ROUTES.providers} element={<Empty />} />
                <Route path={APP_ROUTES.products} element={null}>
                    <Route path={PRODUCTS_ROUTES.withModels} element={<Products />} />
                    <Route path={PRODUCTS_ROUTES.withoutModels} element={<Empty />} />
                    <Route path={PRODUCTS_ROUTES.transfer} element={<Empty />} />
                    <Route path={PRODUCTS_ROUTES.documents} element={<Empty />} />

                    <Route path={PRODUCTS_ROUTES.details} element={<ProductsDetails />} />

                    <Route path={APP_ROUTES.products} element={<Navigate to={PRODUCTS_ROUTES.withModels} />} />
                </Route>
                <Route path={APP_ROUTES.tasks} element={<Empty />} />
                <Route path={APP_ROUTES.models} element={<Empty />} />
                <Route path={APP_ROUTES.settings} element={<Empty />} />

                <Route path="*" element={<Navigate to={APP_ROUTES.dashboard} />} />
            </Routes>
        </GridItem>
    </Grid>
);

export default App;
