import {useCallback, useMemo, useState} from 'react';
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

interface IProps {
    isMinified: boolean;
    onToggle: (isMinified: boolean) => void;
}

const Sidebar: React.FC<IProps> = ({isMinified, onToggle}) => {
    const {t} = useTranslation('sidebar');
    const navigate = useNavigate();
    const location = useLocation();

    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleHoverOut = () => {
        setIsHovered(false);
    };

    const items: IItem[] = useMemo(
        () => [
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
            // {
            //     icon: GearIcon,
            //     text: t('Items.Settings'),
            //     value: APP_ROUTES.settings,
            // },
        ],
        [t]
    );

    const handleItemClick = useCallback(
        (value: string | number) => {
            navigate(value as string);
        },
        [navigate]
    );

    return (
        <div className={styles.sidebar}>
            <div>
                <List>
                    {items.map((item, index) => {
                        const isSectionOpened: boolean =
                            (location.pathname.includes(item.value) && item.value.length > 1) ||
                            (item.value === APP_ROUTES.dashboard && location.pathname === item.value);

                        const subitems = item.children?.map((c, i) => (
                            <ListItem
                                key={`sub-${i}`}
                                className={c.value === location.pathname ? styles.selectedAccordeon : styles.item}
                                iconLeft={<></>}
                                text={c.text}
                                value={c.value}
                                onClick={handleItemClick}
                            />
                        ));

                        return (
                            <div key={index} onMouseOver={isMinified ? handleHover : undefined}>
                                <ListItem
                                    className={isSectionOpened ? styles.selected : styles.item}
                                    iconLeft={
                                        item.icon ? (
                                            <item.icon color={isSectionOpened ? '#5AB030' : undefined} />
                                        ) : undefined
                                    }
                                    text={isMinified ? '' : item.text}
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
                                    {isSectionOpened && !!item.children ? (
                                        isMinified ? (
                                            isHovered ? (
                                                <div
                                                    className={styles.notification}
                                                    onMouseOut={isMinified ? handleHoverOut : undefined}
                                                >
                                                    {subitems}
                                                </div>
                                            ) : undefined
                                        ) : (
                                            subitems
                                        )
                                    ) : undefined}
                                </ListItem>
                            </div>
                        );
                    })}
                </List>
            </div>

            <div>
                {isMinified ? (
                    <IconButton className={styles.btnClose} aria-label="close icon" onClick={() => onToggle(false)}>
                        <ChevronRightIcon />
                    </IconButton>
                ) : (
                    <RegularButton
                        className={styles.btnOpen}
                        iconLeft={<ChevronLeftIcon />}
                        onClick={() => onToggle(true)}
                        variant="outline"
                    >
                        {t('Button.Close')}
                    </RegularButton>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
