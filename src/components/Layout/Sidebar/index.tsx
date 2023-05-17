import {useCallback} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {List, ListItem} from 'fronton-react';
import {
    HouseSimpleIcon,
    TruckIcon,
    CubeIcon,
    FileIcon,
    GearIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    IconComponent,
} from '@fronton/icons-react';
import {APP_ROUTES, PRODUCTS_ROUTES} from '../../../common/consts';
import styles from './Sidebar.module.css';
import ModelsIcon from '../../Icons/ModelsIcon';

interface IItem {
    text: string;
    value: string;
    icon?: IconComponent | React.FC;
    children?: IItem[];
}

const items: IItem[] = [
    {
        icon: HouseSimpleIcon,
        text: 'Dashboard',
        value: APP_ROUTES.dashboard,
    },
    {
        icon: TruckIcon,
        text: 'Поставщики',
        value: APP_ROUTES.providers,
    },
    {
        icon: CubeIcon,
        text: 'Товары',
        value: APP_ROUTES.products,
        children: [
            {
                text: 'С моделью качества',
                value: PRODUCTS_ROUTES.withModels,
            },
            {
                text: 'Без модели качества',
                value: PRODUCTS_ROUTES.withoutModels,
            },
            // {
            //     text: 'Управление трансфером',
            //     value: PRODUCTS_ROUTES.transfer,
            // },
            {
                text: 'Документы',
                value: PRODUCTS_ROUTES.documents,
            },
        ],
    },
    {
        icon: FileIcon,
        text: 'Задачи',
        value: APP_ROUTES.tasks,
    },
    {
        icon: ModelsIcon,
        text: 'Модели',
        value: APP_ROUTES.models,
    },
    {
        icon: GearIcon,
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
                {items.map((item, index) => {
                    const isSectionOpened: boolean =
                        (location.pathname.includes(item.value) && item.value.length > 1) ||
                        (item.value === APP_ROUTES.dashboard && location.pathname === item.value);

                    return (
                        <ListItem
                            key={index}
                            iconLeft={
                                item.icon ? <item.icon color={isSectionOpened ? '#5AB030' : undefined} /> : undefined
                            }
                            text={item.text}
                            value={item.value}
                            onClick={handleItemClick}
                            iconRight={
                                !!item.children?.length ? (
                                    isSectionOpened ? (
                                        <ChevronDownIcon />
                                    ) : (
                                        <ChevronRightIcon />
                                    )
                                ) : undefined
                            }
                        >
                            {isSectionOpened
                                ? item.children?.map((c, i) => (
                                      <ListItem
                                          key={`sub-${i}`}
                                          className={c.value === location.pathname ? styles.selected : ''}
                                          iconLeft={<></>}
                                          text={c.text}
                                          value={c.value}
                                          onClick={handleItemClick}
                                      />
                                  ))
                                : undefined}
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
};

export default Sidebar;
