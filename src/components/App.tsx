import {Empty} from 'antd';
import {Grid, GridItem} from 'fronton-react';
import {Routes, Route} from 'react-router-dom';
import {APP_ROUTES} from '../common/consts';
import Header from './Layout/Header/Header';
import Sidebar from './Layout/Sidebar/Sidebar';
import Products from './Products/Products';

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
                <Route path={APP_ROUTES.products} element={<Products />} />
                <Route path={APP_ROUTES.tasks} element={<Empty />} />
                <Route path={APP_ROUTES.models} element={<Empty />} />
                <Route path={APP_ROUTES.settings} element={<Empty />} />
            </Routes>
        </GridItem>
    </Grid>
);

export default App;
