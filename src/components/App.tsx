import {Empty} from 'antd';
import {Grid, GridItem} from 'fronton-react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {APP_ROUTES, PRODUCTS_ROUTES} from '../common/consts';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import ProductsWithQualityModel from './Products/WithQualityModel';
import ProductsWithoutQualityModel from './Products/WithoutQualityModel';
import ProductDetails from './Products/ProductDetails/ProductDetails';
import Products from './Products';

const App: React.FC = () => (
    <Grid areas={['header header header', 'aside main spacer']} columnGap={16} columns="1fr 10fr 12px">
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
                <Route path={APP_ROUTES.products} element={<Products />}>
                    <Route path={PRODUCTS_ROUTES.withModels} element={<ProductsWithQualityModel />} />
                    <Route path={PRODUCTS_ROUTES.withoutModels} element={<ProductsWithoutQualityModel />} />
                    <Route path={PRODUCTS_ROUTES.transfer} element={<Empty />} />
                    <Route path={PRODUCTS_ROUTES.documents} element={<Empty />} />

                    <Route path={PRODUCTS_ROUTES.details} element={<ProductDetails />} />

                    <Route path={APP_ROUTES.products} element={<Navigate to={PRODUCTS_ROUTES.withModels} />} />
                </Route>
                <Route path={APP_ROUTES.tasks} element={<Empty />} />
                <Route path={APP_ROUTES.models} element={<Empty />} />
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
