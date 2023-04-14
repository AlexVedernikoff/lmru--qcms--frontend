import {useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {List, ListItem} from 'fronton-react';
import {HouseSimpleIcon, TruckIcon, BoundingBoxIcon, CubeIcon, FileIcon, GearIcon} from '@fronton/icons-react';
import {Icon} from 'fronton-react/list/list-item/types';
import {APP_ROUTES} from '../../../common/consts';
import styles from './Sidebar.module.css';

interface IItem {
    icon: Icon;
    text: string;
    value: string;
}

const items: IItem[] = [
    {
        icon: <HouseSimpleIcon />,
        text: 'Dashboard',
        value: APP_ROUTES.dashboard,
    },
    {
        icon: <TruckIcon />,
        text: 'Поставщики',
        value: APP_ROUTES.providers,
    },
    {
        icon: <CubeIcon />,
        text: 'Товары',
        value: APP_ROUTES.products,
    },
    {
        icon: <FileIcon />,
        text: 'Задачи',
        value: APP_ROUTES.tasks,
    },
    {
        icon: <BoundingBoxIcon />,
        text: 'Модели',
        value: APP_ROUTES.models,
    },
    {
        icon: <GearIcon />,
        text: 'Настройки',
        value: APP_ROUTES.settings,
    },
];

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleItemClick = useCallback(
        (value: string | number) => {
            navigate(value as string);
        },
        [navigate]
    );

    return (
        <div className={styles.sidebar}>
            <List>
                {items.map((item, index) => (
                    <ListItem
                        key={index}
                        iconLeft={item.icon}
                        text={item.text}
                        value={item.value}
                        onClick={handleItemClick}
                        className={item.value === location.pathname ? styles.selected : ''}
                    />
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
