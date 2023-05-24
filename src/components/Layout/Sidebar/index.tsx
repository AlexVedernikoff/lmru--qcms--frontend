import {useCallback, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {IconButton, List, ListItem, RegularButton} from 'fronton-react';
import {
    HouseSimpleIcon,
    TruckIcon,
    CubeIcon,
    FileIcon,
    GearIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    IconComponent,
} from '@fronton/icons-react';
import {APP_ROUTES, PRODUCTS_ROUTES} from '../../../common/consts';
import styles from './Sidebar.module.css';
import ModelsIcon from '../../Icons/ModelsIcon';
import {useTranslation} from 'react-i18next';

interface IItem {
    text: string;
    value: string;
    icon?: IconComponent | React.FC;
    children?: IItem[];
}

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    const {t} = useTranslation('sidebar');

    const items: IItem[] = [
        {
            icon: HouseSimpleIcon,
            text: t('Items.Dashboard'),
            value: APP_ROUTES.dashboard,
        },
        {
            icon: TruckIcon,
            text: t('Items.Providers'),
            value: APP_ROUTES.providers,
        },
        {
            icon: CubeIcon,
            text: t('Items.Products'),
            value: APP_ROUTES.products,
            children: [
                {
                    text: t('Items.WithQualityModel'),
                    value: PRODUCTS_ROUTES.withModels,
                },
                {
                    text: t('Items.WithoutQualityModel'),
                    value: PRODUCTS_ROUTES.withoutModels,
                },
                {
                    text: t('Items.Transfer'),
                    value: PRODUCTS_ROUTES.transfer,
                },
                {
                    text: t('Items.Documents'),
                    value: PRODUCTS_ROUTES.documents,
                },
            ],
        },
        {
            icon: FileIcon,
            text: t('Items.Tasks'),
            value: APP_ROUTES.tasks,
        },
        {
            icon: ModelsIcon,
            text: t('Items.Models'),
            value: APP_ROUTES.models,
        },
        {
            icon: GearIcon,
            text: t('Items.Settings'),
            value: APP_ROUTES.settings,
        },
    ];

    const handleItemClick = useCallback(
        (value: string | number) => {
            navigate(value as string);
        },
        [navigate]
    );

    return (
        <div className={isOpen ? styles.sidebar : styles.closeSidebar}>
            <List>
                {items.map((item, index) => {
                    const isSectionOpened: boolean =
                        (location.pathname.includes(item.value) && item.value.length > 1) ||
                        (item.value === APP_ROUTES.dashboard && location.pathname === item.value);

                    return (
                        <ListItem
                            key={index}
                            className={item.value === location.pathname || isSectionOpened ? styles.selected : ''}
                            iconLeft={
                                item.icon ? <item.icon color={isSectionOpened ? '#5AB030' : undefined} /> : undefined
                            }
                            text={isOpen ? item.text : ''}
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
                            {!isOpen && isSectionOpened
                                ? item.children && (
                                      <div className={styles.notification}>
                                          {item.children?.map((c, i) => {
                                              return (
                                                  <ListItem
                                                      key={`sub-${i}`}
                                                      className={
                                                          c.value === location.pathname ? styles.selectedAccordeon : ''
                                                      }
                                                      iconLeft={<></>}
                                                      text={c.text}
                                                      value={c.value}
                                                      onClick={handleItemClick}
                                                  />
                                              );
                                          })}
                                      </div>
                                  )
                                : undefined || (isOpen && isSectionOpened)
                                ? item.children?.map((c, i) => (
                                      <ListItem
                                          key={`sub-${i}`}
                                          className={c.value === location.pathname ? styles.selectedAccordeon : ''}
                                          iconLeft={<></>}
                                          text={isOpen ? c.text : ''}
                                          value={c.value}
                                          onClick={handleItemClick}
                                      />
                                  ))
                                : undefined}
                        </ListItem>
                    );
                })}
            </List>
            {isOpen ? (
                <RegularButton
                    className={styles.btnOpen}
                    iconLeft={<ChevronLeftIcon />}
                    onClick={function noRefCheck() {
                        setIsOpen(false);
                    }}
                    variant="outline"
                >
                    {t('Button.Close')}
                </RegularButton>
            ) : (
                <IconButton
                    className={styles.btnClose}
                    aria-label="close icon"
                    onClick={function noRefCheck() {
                        setIsOpen(true);
                    }}
                >
                    <ChevronRightIcon />
                </IconButton>
            )}
        </div>
    );
};

export default Sidebar;
