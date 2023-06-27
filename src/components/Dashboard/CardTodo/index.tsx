import styles from './styles.module.css';
import AddTodoIcon from '../../Icons/AddTodoIcon';
import {useTranslation} from 'react-i18next';
import {IItemListTodo} from '../../../common/clientModels';
import {Loader} from 'fronton-react';
import {WarningCircleIcon} from '@fronton/icons-react';

interface Props {
    items: IItemListTodo[];
}

export const CardTodo = (props: Props) => {
    const {t} = useTranslation('dashboard');
    const {items} = props;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.addIcon}>
                    <AddTodoIcon />
                </div>
                <div className={styles.title}>{t('List.Title')}</div>
            </div>
            <div>
                <ul className={styles.list}>
                    {items.map((item, index) => {
                        return (
                            <li key={index}>
                                <div>{item.label}</div>
                                <div className={styles.containerValues}>
                                    <div>{item.icon ? <item.icon /> : undefined}</div>
                                    <div className={item.valueImportant ? styles.importantValue : undefined}>
                                        {item.valueImportant}
                                    </div>
                                    {item.isLoading && <Loader variant="primary" size="s" />}
                                    {item.isError && (
                                        <WarningCircleIcon
                                            size="m"
                                            type="outline"
                                            color="attention-primary"
                                            className={styles.errorIcon}
                                        />
                                    )}
                                    {!item.isError && !item.isLoading && <div>{item.value}</div>}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
