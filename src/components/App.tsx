import {createContext, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Empty} from 'antd';
import {APP_ROUTES, MODELS_ROUTES, PRODUCTS_ROUTES, PROVIDER_ROUTES, TASKS_ROUTES} from '../common/consts';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import ProductsWithQualityModel from './Products/WithQualityModel';
import ProductsWithoutQualityModel from './Products/WithoutQualityModel';
import ProductsWithDocuments from './Products/WithDocuments';
import ProductDetails from './Products/ProductDetails/ProductDetails';
import ProviderDetails from './Providers/ProviderDetails/ProductDetails';
import ModelDetails from './Models/ModelDetails';
import Transfer from './Products/Transfer';
import Providers from './Providers';
import Products from './Products';
import Models from './Models';
import Tasks from './Tasks';
import Dashboard from './Dashboard';
import TaskDetails from './Tasks/TaskDetails';
import styles from './App.module.css';

const App: React.FC = () => {
    const [isMinified, setIsMinified] = useState(localStorage.getItem('isSidebarMinified') === 'true' || false);

    const handleSidebarToggle = (isMinified: boolean) => {
        setIsMinified(isMinified);
        localStorage.setItem('isSidebarMinified', isMinified + '');
    };

    const Context = createContext({name: 'Default'});

    return (
        <Context.Provider value={{name: 'Default'}}>
            <div className={styles.app}>
                <div className={styles.header}>
                    <Header />
                </div>

                <div className={styles.main}>
                    <div className={isMinified ? styles.sidebarMini : styles.sidebar}>
                        <Sidebar isMinified={isMinified} onToggle={handleSidebarToggle} />
                    </div>

                    <div className={isMinified ? styles.containerFull : styles.container}>
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

                                <Route
                                    path={APP_ROUTES.products}
                                    element={<Navigate to={PRODUCTS_ROUTES.withModels} />}
                                />
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
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
};

export default App;
