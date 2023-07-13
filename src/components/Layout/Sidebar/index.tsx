import {useCallback, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Icon, IconButton, List, RegularButton} from 'fronton-react';
import {HouseSimpleIcon, TruckIcon, CubeIcon, FileIcon, ChevronRightIcon, ChevronLeftIcon} from '@fronton/icons-react';
import styles from './Sidebar.module.css';
import ModelsIcon from '../../Icons/ModelsIcon';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from 'store';
import {EUserRole} from 'common/roles';
import {RoutePath} from 'common/routes';
import {Icon as IIcon} from 'fronton-react/list/list-item/types';
import {SidebarItem} from './SidebarItem';

export interface ISidebarItem {
    text: string;
    path: RoutePath;
    rolesThatHaveAccess: EUserRole[];
    iconLeft?: IIcon;
    children?: ISidebarItem[];
}

interface IProps {
    isOpened: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<IProps> = ({isOpened, onToggle}) => {
    const {t} = useTranslation('sidebar');
    const navigate = useNavigate();
    const location = useLocation();

    const roles = useAppSelector(store => store.userStore.userData!.roles);

    const isItemVisible = useCallback(
        (item: ISidebarItem) => roles.some(role => item.rolesThatHaveAccess.includes(role)),
        [roles]
    );

    const handleItemClick = useCallback(
        (item: ISidebarItem) => {
            if (item.path !== location.pathname) {
                navigate(item.path);
            }
        },
        [navigate, location]
    );

    const items: ISidebarItem[] = useMemo(
        () =>
            [
                {
                    text: t('Items.Dashboard'),
                    path: RoutePath.Dashboard,
                    iconLeft: (
                        <Icon>
                            <HouseSimpleIcon />
                        </Icon>
                    ),
                    rolesThatHaveAccess: [
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
                    text: t('Items.Providers'),
                    path: RoutePath.Providers,
                    iconLeft: (
                        <Icon>
                            <TruckIcon />
                        </Icon>
                    ),
                    rolesThatHaveAccess: [
                        EUserRole.Admin,
                        EUserRole.KeyUser,
                        EUserRole.QE,
                        EUserRole.Supplier,
                        EUserRole.SQM,
                        EUserRole.InternalUser,
                    ],
                },
                {
                    text: t('Items.Products'),
                    path: RoutePath.Products,
                    iconLeft: (
                        <Icon>
                            <CubeIcon />
                        </Icon>
                    ),
                    children: [
                        {
                            text: t('Items.WithQualityModel'),
                            path: RoutePath.ProductsWithModels,
                            rolesThatHaveAccess: [
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
                            text: t('Items.WithoutQualityModel'),
                            path: RoutePath.ProductsWithoutModels,
                            rolesThatHaveAccess: [
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
                            text: t('Items.Transfer'),
                            path: RoutePath.ProductsTransfer,
                            rolesThatHaveAccess: [
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
                            text: t('Items.Documents'),
                            path: RoutePath.ProductsDocuments,
                            rolesThatHaveAccess: [
                                EUserRole.Admin,
                                EUserRole.KeyUser,
                                EUserRole.QE,
                                EUserRole.SQM,
                                EUserRole.InternalUser,
                            ],
                        },
                    ].filter(isItemVisible),
                    rolesThatHaveAccess: [
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
                    text: t('Items.Tasks'),
                    path: RoutePath.Tasks,
                    iconLeft: (
                        <Icon>
                            <FileIcon />
                        </Icon>
                    ),
                    rolesThatHaveAccess: [
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
                    text: t('Items.Models'),
                    path: RoutePath.Models,
                    iconLeft: (
                        <Icon>
                            <ModelsIcon />
                        </Icon>
                    ),
                    rolesThatHaveAccess: [
                        EUserRole.Admin,
                        EUserRole.KeyUser,
                        EUserRole.QE,
                        EUserRole.Supplier,
                        EUserRole.SQM,
                        EUserRole.InternalUser,
                        EUserRole.ServiceProvider,
                    ],
                },
            ].filter(isItemVisible),
        [t, isItemVisible]
    );

    return (
        <div className={styles.sidebar}>
            <div>
                <List>
                    {items.map(item => (
                        <SidebarItem key={item.path} data={item} isSidebarOpened={isOpened} onClick={handleItemClick} />
                    ))}
                </List>
            </div>

            <div>
                {isOpened ? (
                    <RegularButton
                        className={styles.btnOpen}
                        iconLeft={<ChevronLeftIcon />}
                        onClick={onToggle}
                        variant="outline"
                    >
                        {t('Button.Close')}
                    </RegularButton>
                ) : (
                    <IconButton className={styles.btnClose} aria-label="close icon" onClick={onToggle}>
                        <ChevronRightIcon />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
