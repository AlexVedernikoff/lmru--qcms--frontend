import {createContext, useCallback, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from '../../Layout/Header';
import Sidebar from '../../Layout/Sidebar';
import SwitchUserRoles from 'components/Common/SwitchUserRoles';
import {AppRoute, RoutePath, appRoutes} from 'common/routes';
import {useAppSelector} from 'store';

import styles from './AuthSuccess.module.css';

const AuthSuccess: React.FC = () => {
    const roles = useAppSelector(store => store.userStore.userData!.roles);

    const [isSidebarOpened, setSidebarOpened] = useState<boolean>(localStorage.getItem('sidebarState') !== 'closed');

    const handleSidebarToggle = () => {
        const isOpened = !isSidebarOpened;
        setSidebarOpened(isOpened);
        if (isOpened) {
            localStorage.setItem('sidebarState', 'opened');
        } else {
            localStorage.setItem('sidebarState', 'closed');
        }
    };

    const Context = createContext({name: 'Default'});

    const renderRoutes = useCallback(
        (routes: AppRoute[]) => {
            const enabledRoutesForCurrentRoles = routes.filter(({enabledRoles}) =>
                roles.some(role => enabledRoles.includes(role))
            );

            return enabledRoutesForCurrentRoles.map(({path, element, childRoutes}) => {
                if (childRoutes) {
                    return (
                        <Route key={path} path={path} element={element}>
                            {renderRoutes(childRoutes)}
                        </Route>
                    );
                }

                return <Route key={path} path={path} element={element} />;
            });
        },
        [roles]
    );

    return (
        <Context.Provider value={{name: 'Default'}}>
            <div className={styles.app}>
                {process.env.NODE_ENV === 'development' && <SwitchUserRoles />}

                <div className={styles.header}>
                    <Header />
                </div>

                <div className={styles.main}>
                    <div className={isSidebarOpened ? styles.sidebar : styles.sidebarMini}>
                        <Sidebar isOpened={isSidebarOpened} onToggle={handleSidebarToggle} />
                    </div>

                    <div className={isSidebarOpened ? styles.container : styles.containerFull}>
                        <Routes>
                            {renderRoutes(appRoutes)}
                            <Route path="*" element={<Navigate to={RoutePath.Dashboard} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Context.Provider>
    );
};

export default AuthSuccess;
