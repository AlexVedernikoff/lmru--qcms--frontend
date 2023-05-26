import styles from './styles.module.css';
import AddTodoIcon from '../../Icons/AddTodoIcon';
import {useTranslation} from 'react-i18next';
import FlagIcon from '../../Icons/FlagIcon';
import { IconComponent } from '@fronton/icons-react';

interface IItem {
    label: string;
    value: number;
    valueImportant: number;
    icon: IconComponent | React.FC;
}

export const CardTodo = () => {
    const {t} = useTranslation('dashboard');

    const items: IItem[] = [
        {
            icon: FlagIcon,
            label: t('List.ReChecking'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.QualifyingTasksLaunch'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.TransferDocuments'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.ProductsWithErrors'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.ProductsWithoutQualityModels'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.CertificationTasksLaunch'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.AdditionalQualificationProducts'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.TasksAwaitingValidation'),
            valueImportant: 2,
            value: 4,
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.addIcon}>
                    <AddTodoIcon />
                </div>
                <div className={styles.title}>{t('Title')}</div>
            </div>
            <div>
                <ul className={styles.list}>
                    {items.map((item, index) => {
                        return (
                            <li key={index}>
                                <div>{item.label}</div>
                                <div className={styles.containerValues}>
                                    <div><item.icon/></div>
                                    <div className={styles.importantValue}>{item.valueImportant}</div>
                                    <div>{item.value}</div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
