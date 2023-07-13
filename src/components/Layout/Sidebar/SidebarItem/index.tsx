import {useEffect, useMemo, useState} from 'react';
import {RoutePath} from 'common/routes';
import {useLocation} from 'react-router-dom';
import {ListItem, ListItemProps} from 'fronton-react';
import {ChevronDownIcon, ChevronRightIcon} from '@fronton/icons-react';
import {CustomIcon} from 'fronton-react/list/list-item/types';
import {useClickOutsideListener} from 'hooks/useClickOutsideListener';
import {ISidebarItem} from '..';

import styles from './styles.module.css';

interface Props {
    data: ISidebarItem;
    isSidebarOpened: boolean;
    onClick: (item: ISidebarItem) => void;
}

export const SidebarItem: React.FC<Props> = ({data, isSidebarOpened, onClick}) => {
    const location = useLocation();

    const [isChildrenListOpened, setChildrenListOpened] = useState<boolean>(false);
    const {ref} = useClickOutsideListener<HTMLDivElement>(() => setChildrenListOpened(false));

    const isActive = useMemo(() => {
        if (data.path === RoutePath.Dashboard) return location.pathname === '/' || location.pathname === '';
        return location.pathname.startsWith(data.path);
    }, [location, data]);

    const iconRight = (): CustomIcon | undefined => {
        if (!data.children) return;
        return isChildrenListOpened ? <ChevronDownIcon /> : <ChevronRightIcon />;
    };

    const handleClick = () => {
        if (data.children) {
            setChildrenListOpened(value => !value);
        }
        onClick(data);
    };

    // Если изменился url, и при этом сайдбар не был открыт - закрываем список дочерних вкладок.
    useEffect(() => {
        if (!isSidebarOpened) {
            setChildrenListOpened(false);
        }
    }, [location.pathname, isSidebarOpened]);

    const props: ListItemProps = {
        text: isSidebarOpened ? data.text : undefined,
        iconLeft: data.iconLeft,
        iconRight: iconRight(),
        onClick: handleClick,
        value: data.path,
        className: isActive ? styles.selected : styles.item,
    };

    // Когда открыт список дочерних вкладок и открыт сайдбар.
    if (data.children && isChildrenListOpened && isSidebarOpened) {
        return (
            <ListItem {...props}>
                {data.children.map(childItem => (
                    <SidebarItem
                        key={childItem.path}
                        data={childItem}
                        isSidebarOpened={isSidebarOpened}
                        onClick={() => onClick(childItem)}
                    />
                ))}
            </ListItem>
        );
    }

    // Когда открыт список дочерних вкладок, но закрыт сайдбар.
    if (data.children && isChildrenListOpened && !isSidebarOpened) {
        return (
            <div ref={ref}>
                <ListItem {...props}>
                    {
                        <div className={styles.childrenItemsList}>
                            {data.children.map(childItem => (
                                <SidebarItem
                                    key={childItem.path}
                                    data={childItem}
                                    isSidebarOpened={true}
                                    onClick={() => onClick(childItem)}
                                />
                            ))}
                        </div>
                    }
                </ListItem>
            </div>
        );
    }

    return <ListItem {...props} />;
};
